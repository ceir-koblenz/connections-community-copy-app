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
import { FileXmlParser } from 'src/app/xml-parser/remote-applications/file-xml-parser';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(private apiClient: ApiClientService,
        private loggingService: LoggingService, private httpClient: HttpClient) { }

    async load(entity: EntityLink<RemoteApplication>): Promise<FileCollection> {
        var xmlParser: FileCollectionXmlParser = new FileCollectionXmlParser();
        var files = new FileCollection();

        var nextPageLink: URL = entity.url;

        do {
            var currentXml = await this.apiClient.loadXML(nextPageLink)
            nextPageLink = xmlParser.getNextPageUrlHack(entity.url, currentXml)
            xmlParser.fillFromXml(files, currentXml)  // RemoteApplicationCollection Instanz anhand des XMLs befüllen
        } while (nextPageLink !== null);

        entity.model = files;
        return files;
    }

    async create(newCommunityId: string, fileCollection: FileCollection): Promise<HttpResponse<any>> {
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
                await asyncForEach(filesToCopy, async (file: File) => {
                    const copyFile = async () => {
                        // Download file
                        var blob = await this.httpClient.get(file.fileUrl, { responseType: 'blob' }).toPromise();
                        // Create file
                        var url = new URL(getConfig().connectionsUrl + "/files/basic/api/communitylibrary/" + newCommunityId + "/feed")
                        // Make url-safe string for slug
                        var slug = encodeURI(file.title.toString());
                        result = await this.apiClient.postFile(blob, url, { "Slug": slug, "X-Update-Nonce": nonceResult });
                        if (result && result.ok) {
                            this.loggingService.LogInfo('File wurde erstellt.')
                            // parse new file and get new uuid
                            var fileXmlParser: FileXmlParser = new FileXmlParser();
                            var newFile = new File();
                            fileXmlParser.fillFromXml(newFile, result.body);
                            file.uUid = newFile.uUid;
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

    /**
     * Get nonce information to finally post file.
     * 
     * @returns {Promise<any>}
     */
    public getNonce(): Promise<any> {
        return this.httpClient.get(getConfig().connectionsUrl + "/files/basic/api/nonce", { responseType: 'text' }).toPromise();
    }

}
