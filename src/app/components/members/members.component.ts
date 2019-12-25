import { Component, Input, OnInit } from '@angular/core';
import { MemberCollection } from 'src/app/models/member-collection.model';
import { EntityLink } from 'src/app/common/entity-link';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { Member } from 'src/app/models/member.model';
import { User } from 'src/app/models/user.model';
import { DeclareFunctionStmt } from '@angular/compiler';
import { Url } from 'url';
import { getConfig } from 'src/app/app-config';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.sass']
})
export class membersComponent implements OnInit {

  @Input() members: EntityLink<MemberCollection>;
  private Collection: MemberCollection;
  OtherRoleCollection: MemberCollection;
  OwnerRoleCollection: MemberCollection;
  CurrentUser: User;
  all: Boolean;

  async ngOnInit() {
    this.all = false;
    this.Collection = await MemberCollection.load(this.apiClient, this.members);
    var url = new URL(getConfig().connectionsUrl + "/profiles/atom/profileService.do")
    this.CurrentUser = await User.load(this.apiClient,url )
    this.Collection.membercollection = this.Collection.membercollection.filter(member => member.UUid != this.CurrentUser.UUid);
    this.Collection.membercollection.forEach(member => {
      if (member.role == "owner") {
        this.OwnerRoleCollection.membercollection.push(member);
      } else {
        this.OtherRoleCollection.membercollection.push(member);
      }
    });
  }

  constructor(private apiClient: ApiClientService) {
    this.OtherRoleCollection = new MemberCollection;
    this.OwnerRoleCollection = new MemberCollection;
  }

  /**
   *Setzt das ShouldCopy-Attribut eines Members
    *
    * @param {Member} Other
    * @memberof membersComponent
    */
  public CheckedMembers(SelctedObject, Other: Member) {
    var cb = <HTMLInputElement>document.getElementById(Other.UUid.toString());
    var member = this.Collection.membercollection.find(function (curr) {
      return curr.UUid == Other.UUid;
    });
    member.shouldCopy = cb.checked;
  }
/**
 *Setzt das ShouldCopy-Attribut aller Member
 *
 * @param {string} elementID
 * @memberof membersComponent
 */
public CheckAll(elementID:string){
    var cb = <HTMLInputElement>document.getElementById(elementID);
    this.all =  cb.checked;
    if (cb.id == "cbAllOthers") {
      this.OtherRoleCollection.membercollection.forEach(member => {
        if(member.shouldCopy != cb.checked){
          member.shouldCopy = cb.checked;
        }
      });
    }else{
      this.OwnerRoleCollection.membercollection.forEach(member => {
        if(member.shouldCopy != cb.checked){
          member.shouldCopy = cb.checked;
        }
      });  
    }
  }
}