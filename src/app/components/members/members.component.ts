import { Component, Input, OnInit } from '@angular/core';
import { MemberCollection } from 'src/app/models/member-collection.model';
import { EntityLink } from 'src/app/common/entity-link';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { Member } from 'src/app/models/member.model';
import { User } from 'src/app/models/user.model';
import { getConfig } from 'src/app/app-config';
import { MemberService } from 'src/app/services/community/member/member.service';
import { ProcessTypeService } from 'src/app/services/process-type.service';
import { ProcessType } from 'src/app/common/process-type';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.sass']
})
export class MembersComponent implements OnInit {

  @Input() members: EntityLink<MemberCollection>;
  private Collection: MemberCollection;
  OtherRoleCollection: MemberCollection = new MemberCollection;
  OwnerRoleCollection: MemberCollection = new MemberCollection;

  copyAllOwners: boolean = false;
  copyAllOthers: boolean = false;

  constructor(private apiClient: ApiClientService,
    private memberService: MemberService,
    private processTypeService: ProcessTypeService) { }


  async ngOnInit() {
    this.Collection = await this.memberService.loadCollection(this.members);
    var url = new URL(getConfig().connectionsUrl + "/profiles/atom/profileService.do")
    var currentUser = await User.load(this.apiClient, url)
    this.Collection.members = this.Collection.members.filter(member => member.UUid != currentUser.UUid);
    this.Collection.members.forEach(member => {
      if (member.role == "owner") {
        this.OwnerRoleCollection.members.push(member);
      } else {
        this.OtherRoleCollection.members.push(member);
      }
    });

    this.processTypeService.getProcessType().subscribe(x => {
      var doCopy = false;
      if (x === ProcessType.copy) {
        doCopy = true;
      } else if (x === ProcessType.createTemplate) {
        doCopy = false;
      }
      this.copyAllOwners = doCopy;
      this._setShouldCopyForAll(this.copyAllOwners, this.OwnerRoleCollection);
  });
}

  /**
   *Togglet das ShouldCopy-Attribut eines Members
    *
    * @param {Member} toToggle
    * @memberof MembersComponent
    */
  public toggleMemberCopy(toToggle: Member) {
  toToggle.shouldCopy = !toToggle.shouldCopy;
}

  public toggleAllOwners() {
  this.copyAllOwners = !this.copyAllOwners
  this._setShouldCopyForAll(this.copyAllOwners, this.OwnerRoleCollection);
}

  public toggleAllOtherMembers() {
  this.copyAllOthers = !this.copyAllOthers
  this._setShouldCopyForAll(this.copyAllOthers, this.OtherRoleCollection);
}

  private _setShouldCopyForAll(shouldCopy: boolean, collection: MemberCollection) {
  collection.members.forEach(x => x.shouldCopy = shouldCopy);
}
}