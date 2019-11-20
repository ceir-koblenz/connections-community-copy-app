import { Injectable } from '@angular/core';
import { Community } from '../models/community.model';
import { CommunityService } from './community/community.service';

/**
 * Service für den Kopiervorgang einer Community samt aller abhängigen Entitäten
 *
 * @export
 * @class CreateTemplateService
 */
@Injectable({
  providedIn: 'root'
})
export class CreateTemplateService {

  constructor(private commService: CommunityService) { }

  async create(community: Community): Promise<CreateTemplateResult> {
    var result = new CreateTemplateResult()
    result.success = true

    var commResult = await this.commService.create(community)
    if (commResult.ok) {
      var location = commResult.headers.get("Location")
      // todo weitere Entitäten zur Community hinzufügen
    } else {
      result.success = false
    }

    return result
  }
}

/**
 * Stellt Ergebnis des Template-Erstellens dar.
 *
 * @export
 * @class CreateTemplateResult
 */
export class CreateTemplateResult {
  success: boolean
}
