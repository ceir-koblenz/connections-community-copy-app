import { Component, Input, OnInit } from '@angular/core';
import { MemberCollection } from 'src/app/models/member-collection.model';
import { EntityLink } from 'src/app/common/entity-link';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { Member } from 'src/app/models/member.model';
import { DeclareFunctionStmt } from '@angular/compiler';

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


  

async ngOnInit() {
    this.Collection = await MemberCollection.load(this.apiClient, this.members);
    this.OtherRoleCollection = new MemberCollection;
    this.OwnerRoleCollection= new MemberCollection;

    this.Collection.membercollection.forEach(member => {
      if(member.role == "owner"){
        this.OwnerRoleCollection.membercollection.push(member);
      }else{
        this.OtherRoleCollection.membercollection.push(member);
      }
    });
  }


  constructor(private apiClient: ApiClientService){

  }

  /**
   *Setzt das Uebernehmen-Attribut eines Members
    *
    * @param {Member} Other
    * @memberof membersComponent
    */
    public CheckedMembers(SelctedObject,Other:Member) {
    var cb = <HTMLInputElement> document.getElementById(Other.UUid.toString());
    var member = this.Collection.membercollection.find(function(curr) {
      return curr.UUid == Other.UUid;  
    });
    member.Uebernehmen = cb.checked;
  }


  public getMembercollection (){

  }


  ngAfterViewInit() {

  }

}