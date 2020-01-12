import { IEntityModel } from '../i-entity-model';
import { EntityLink } from 'src/app/common/entity-link';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { asyncForEach } from 'src/app/common/async-foreach';

/**
 * EntityModel einer Wiki App.
 *
 * @export
 * @class Wiki
 * @implements {IEntityModel}
 */
export class Wiki implements IEntityModel {
	shouldCopy: boolean = false;

	uUid: String;
	title: String;
	summary: String;
	label: String;
	authorUuid: String;
	visibility: String;
	communityUuid: String;
	contentUrl: EntityLink<any>;
	contentXml: String;
	parent: Wiki;
	childWikis: Array<Wiki> = new Array<Wiki>(); // Necessary for component to structure the UI

	static async loadContentXml(client: ApiClientService, entity:Wiki): Promise<String> {
		var result = await client.loadXML(entity.contentUrl.url)
		entity.contentXml = result
		return result
	}

	static async sortWikis(wikis:Array<Wiki>) {
		var childWikis: Array<Wiki> = new Array<Wiki>();

		// If wiki has parent it is a child --> save that.
		await asyncForEach(wikis, async (wiki:Wiki) => {
			if (wiki.parent) {
				childWikis.push(wiki);
			}
		});

		// Go through all child-wikis and check for correct parent to add the child page.
		await asyncForEach(childWikis, async(childWiki:Wiki) => {
			for (let index = 0; index < wikis.length; index++) {
				if (wikis[index].uUid === childWiki.parent.uUid ) {
					// add child to parent
					wikis[index].childWikis.push(childWiki);
					// delete wiki on highest level (in array) because its a child 
					var indexOfChild = wikis.indexOf(childWiki);
					wikis.splice(indexOfChild, 1);
					break;
				}				
			}
		});
	}

	static markParents(wiki:Wiki) {
		if (!wiki.parent) {
			return; // Abbruchbedingung
		} else {
			wiki.parent.shouldCopy = true;
			this.markParents(wiki.parent);
		}
	}

	static async markChilds(wiki:Wiki, copy:boolean, firstCall:boolean) {
		wiki.shouldCopy = copy;
		if (wiki.childWikis.length === 0) {
			return; // Abbruchbedingung
		} else {
			if (!firstCall) {
				wiki.shouldCopy = copy;
			}			
			await asyncForEach(wiki.childWikis, async(tWiki:Wiki) => {
				await this.markChilds(tWiki, copy, false);
			});
		}
	}

}