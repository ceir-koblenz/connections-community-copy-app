import { Injectable } from '@angular/core';
import { NodesCollectionXmlParser } from 'src/app/xml-parser/remote-applications/nodes-xml-parser';
import { asyncForEach } from 'src/app/common/async-foreach';
import { ApiClientService } from '../../api-client/api-client.service';
import { LoggingService } from '../../logging/logging.service';
import { NodeXmlWriter } from './node-xml-writer';
import { getConfig } from 'src/app/app-config';
import { HttpResponse } from '@angular/common/http';
import { NodeCollection } from 'src/app/models/remote-applications/nodes.model';
import { Node } from 'src/app/models/remote-applications/node.model';
import { NodeXmlParser } from 'src/app/xml-parser/remote-applications/node-xml-parser';



@Injectable({
    providedIn: 'root'
})
export class NodeService {

    constructor(private apiClient: ApiClientService,
        private loggingService: LoggingService) { }
/**
 *Kopieren der Nodes einer Aktivität
 *
 * @param {string} Uuid
 * @param {string} Uuid_new
 * @memberof NodeService
 */
async copyNodes(Uuid: string,Uuid_new:string,sourceNew:string){
        var xmlParser: NodesCollectionXmlParser = new NodesCollectionXmlParser();
        var nodes = new NodeCollection();
        var offeneNodes = new NodeCollection();
        var erstellteNodes = new NodeCollection();
        var NodeWriter = new NodeXmlWriter();

        var url: URL = new URL(getConfig().connectionsUrl + "/activities/service/atom2/activity?activityUuid=" + Uuid);
        
        var currentXml = await this.apiClient.loadXML(url);
        xmlParser.fillFromXml(nodes,currentXml);

        url = new URL(getConfig().connectionsUrl + "/activities/service/atom2/activity?activityUuid=" + Uuid_new);

        nodes.nodes.forEach(node =>{
            node.source = sourceNew;
        });
        // Jeden Node erstellen der direkt unter der Aktivität steht
        nodes.nodes.reverse();
        await asyncForEach(nodes.nodes,async (Node:Node) => { 
            if (Node.href.includes(Uuid)) {
                await this.erstelleNode(Node,url,NodeWriter,false);
                // Die neuen Links für die ChildNodes der Node zuweisen
                erstellteNodes.nodes.push(Node);
            }else{
                offeneNodes.nodes.push(Node);
            }
        });
        while(nodes.nodes.length !== erstellteNodes.nodes.length){
            await asyncForEach(erstellteNodes.nodes,async (ParentNode:Node) => {
                await asyncForEach(offeneNodes.nodes,async (ChildNode:Node) => {   
                if (ChildNode.href.includes(ParentNode.Uuid)) {
                    // Die Links der ChildNode übergeben
                    ChildNode.href = ParentNode.ChildHref;
                    ChildNode.ref = ParentNode.ChildRef;
                    await this.erstelleNode(ChildNode,url,NodeWriter,true);
                    erstellteNodes.nodes.push(ChildNode);
                    offeneNodes.nodes.splice(offeneNodes.nodes.findIndex((entry) => 
                                            (entry.Uuid == ChildNode.Uuid)), 1);
                }
                });
            });
        }
    }
/**
 *Erstellung einer Node.
 *
 * @param {Node} node
 * @param {URL} url
 * @param {NodeXmlWriter} NodeWriter
 * @param {boolean} Child
 * @returns {Promise<Node>}
 * @memberof NodeService
 */
async erstelleNode(node:Node,url:URL,NodeWriter:NodeXmlWriter,Child:boolean){
        var result:HttpResponse<any>;
        switch(node.category){
            case "chat":{
                    var xml = NodeWriter.ChattoXmlString(node,Child);
                    result = await this.apiClient.postXML(xml, url);
                    if (result.ok) {
                        this.loggingService.LogInfo('ChatNode erstellt.')
                    } else {
                        this.loggingService.LogInfo('ChatNode erstellen fehlgeschlagen.')
                    }
                break;
            }
            case "email":{
                    var xml = NodeWriter.EmailtoXmlString(node);
                    result = await this.apiClient.postXML(xml, url);
                    if (result.ok) {
                        this.loggingService.LogInfo('EntryNode erstellt.')
                    } else {
                        this.loggingService.LogInfo('EntryNode erstellen fehlgeschlagen.')
                    }
                break;
            }
            case "entry":{
                    var xml = NodeWriter.EntrytoXmlString(node,Child);
                    result = await this.apiClient.postXML(xml, url);
                    if (result.ok) {
                        this.loggingService.LogInfo('EntryNode erstellt.')
                    } else {
                        this.loggingService.LogInfo('EntryNode erstellen fehlgeschlagen.')
                    }
                break;
            }
            case "reply":{
  
                var xml = NodeWriter.ReplytoXmlString (node,Child);
                result = await this.apiClient.postXML(xml, url);
                if (result.ok) {
                    this.loggingService.LogInfo('ReplyNode erstellt.')
                } else {
                    this.loggingService.LogInfo('ReplyNode erstellen fehlgeschlagen.')
                }
                break;
            }
            case "section":{
                    var xml = NodeWriter.SectiontoXmlString(node);
                    result = await this.apiClient.postXML(xml, url);
                    if (result.ok) {
                        this.loggingService.LogInfo('SectionNode erstellt.')
                    } else {
                        this.loggingService.LogInfo('SectionNode erstellen fehlgeschlagen.')
                    }
                    break;
            }
            case "todo":{
                    var xml = NodeWriter.TodotoXmlString(node,Child);
                    result = await this.apiClient.postXML(xml, url);
                    if (result.ok) {
                        this.loggingService.LogInfo('ToDoNode erstellt.')
                    } else {
                        this.loggingService.LogInfo('ToDoNode erstellen fehlgeschlagen.')
                    }
                break;
            }
        }
        var xmlParser: NodesCollectionXmlParser = new NodeXmlParser();
        var nodeE = new Node();
        xmlParser.fillFromXml(nodeE, result.body);
        node.ChildHref = nodeE.ChildHref;
        node.ChildRef = nodeE.ChildRef;
    }    
}
