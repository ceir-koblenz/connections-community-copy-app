import { Injectable } from '@angular/core';
import { EntityLink } from 'src/app/common/entity-link';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { asyncForEach } from 'src/app/common/async-foreach';
import { ApiClientService } from '../../api-client/api-client.service';
import { LoggingService } from '../../logging/logging.service';
import { getConfig } from 'src/app/app-config';
import { FileCollection } from 'src/app/models/remote-applications/file-collection.model';
import { File } from 'src/app/models/remote-applications/file.model';
import { FileCollectionXmlParser } from 'src/app/xml-parser/remote-applications/file-collection-xml-parser';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FileService } from './file.service';
import { FolderCollection } from 'src/app/models/remote-applications/folder-collection.model';
import { FolderCollectionXmlParser } from 'src/app/xml-parser/remote-applications/folder-collection-xml-parser';
import { Folder } from 'src/app/models/remote-applications/folder.model';

@Injectable({
    providedIn: 'root'
})
export class FolderService {

    constructor(private apiClient: ApiClientService,
        private loggingService: LoggingService, private httpClient: HttpClient, private fileService: FileService) { }

    async load(entity: EntityLink<RemoteApplication>): Promise<FolderCollection> {
        var folders = new FolderCollection();
        // root folder for files without folder
        var rootFolder = new Folder();
        rootFolder.title = "Dateien ohne Ordner";
        folders.folders.push(rootFolder);

        /**
        * Step 1 - Load files without folder <td:isFiledInFolder>false</td:isFiledInFolder> --> creates dummy folder "root"?
        * Step 2 - Load folder (category=collection) & child folder (save as childFolder) --> dann habe ich eine Folder Collection mit Foldern und childs:Array<Folder> (das wieder childs haben kann - rekursion!)
        * Step 3 - Load files of folder by folder IDs (Iterieren über alle Folder & Files appenden an jeweilige folder)
        */

        // Step 1
        await this.loadFilesWithoutFolder(folders, entity);

        // Step 2
        await this.loadFolder(folders, entity.url);
        const startLoadSubfolder = async () => {
            await asyncForEach(folders.folders, async (folder: Folder) => {
                // skip first folder (root)
                if (!(folder.title === "Dateien ohne Ordner")) {
                    await this.loadSubfolder(folder);
                }
            })
        }
        await startLoadSubfolder();

        // Step 3
        await this.loadFilesOfFolder(folders.folders);

        entity.model = folders;
        return folders;
    }

    private async loadFilesWithoutFolder(folders: FolderCollection, entity: EntityLink<RemoteApplication>) {
        var files = await this.fileService.load(entity);
        const filterFilesWithoutFolder = async () => {
            await asyncForEach(files.files, async (file: any) => {
                if (file.isInFolder) {
                    folders.folders[0].files.push(file);
                }
            });
        }
        await filterFilesWithoutFolder();
    }

    private async loadFolder(folders: FolderCollection, url: URL) {
        var xmlParser: FolderCollectionXmlParser = new FolderCollectionXmlParser();
        var tFolders = new FolderCollection();

        // category=collection loads folder on root level only!
        var nextPageLink = new URL(url + "?category=collection");

        do {
            var currentXml = await this.apiClient.loadXML(nextPageLink)
            nextPageLink = xmlParser.getNextPageUrl(url, currentXml)
            xmlParser.fillFromXml(tFolders, currentXml)
        } while (nextPageLink !== null);

        // check if folder was found!
        if (tFolders.folders.length === 1 && tFolders.folders[0].uUid === undefined) {
            return
        }
        // add new found folders to existing array of folders
        folders.folders.push(...tFolders.folders);
    }

    private async loadSubfolder(folder: Folder) {
        // Load xml to check if there are subfolders
        var tFolders = new FolderCollection();
        await this.loadFolder(tFolders, new URL(folder.feed_link));
        // Abbruchbedingung
        if (tFolders.folders.length === 0) {
            return
        } else {
            // save subfolder to folder
            folder.childFolders.push(...tFolders.folders);
            const loadNewSubfolder = async () => {
                await asyncForEach(folder.childFolders, async (folder: Folder) => {
                    await this.loadSubfolder(folder);
                });
            }
            await loadNewSubfolder();
        }
    }

    private async loadFilesOfFolder(folders: Array<Folder>) {
        const startLoadFilesOfFolder = async () => {
            await asyncForEach(folders, async (folder: Folder) => {
                // skip first folder (root)
                if (!(folder.title === "Dateien ohne Ordner")) {
                    // category=document loads folder on root level only!
                    var nextPageLink = new URL(folder.feed_link + "?category=document");
                    var tEntity = new EntityLink<any>(nextPageLink, "files");
                    var files = await this.fileService.load(tEntity);
                    if (files.files.length > 0 && files.files[0].uUid !== undefined) {
                        folder.files.push(...files.files as any);
                    }
                    if (folder.childFolders.length > 0) {
                        await this.loadFilesOfFolder(folder.childFolders);
                    } else {
                        // Abbruchbedingung
                        return // wenn kein childFolder mehr vorhanden ist.
                    }
                }
            })
        }
        await startLoadFilesOfFolder();
    }

    /*
    async create(newCommunityId: string, fileCollection: FileCollection):Promise<HttpResponse<any>> {
        var result: HttpResponse<any>;
        var filesToCopy: Array<File> = new Array<File>();
        // Filter out which files should be copied.
        const getFilesToCopy = async () => {
            await asyncForEach(fileCollection.files, async (file: File) => {
                if (file.shouldCopy) {
                    filesToCopy.push(file);
                }
            });
        }
        await getFilesToCopy();

        if (filesToCopy.length > 0) {
            this.loggingService.LogInfo('Start kopieren von Files...')
            // Get current nonce value 
            var nonceResult = await this.getNonce();
            // Create files            
            const copyFileEntries = async () => {
                await asyncForEach(filesToCopy, async (file) => {
                    const copyFile = async () => {
                        // Download file
                        var blob = await this.httpClient.get(file.fileUrl, { responseType: 'blob' }).toPromise();
                        // Create file
                        var url = new URL(getConfig().connectionsUrl + "/files/basic/api/communitylibrary/" + newCommunityId + "/feed")
                        result = await this.apiClient.postFile(blob, url, { "Slug": file.title, "X-Update-Nonce": nonceResult });
                        if (result.ok) {
                            this.loggingService.LogInfo('File wurde erstellt.')
                        } else {
                            this.loggingService.LogInfo('File erstellen fehlgeschlagen.')
                        }
                    }
                    await copyFile();
                });
            }
            await copyFileEntries();
        }
        return result;
    }
    */

}
