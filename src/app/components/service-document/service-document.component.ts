import { Component, OnInit } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { ServiceDocument } from 'src/app/models/service-document.model';

@Component({
  selector: 'app-service-document',
  templateUrl: './service-document.component.html',
  styleUrls: ['./service-document.component.sass']
})
export class ServiceDocumentComponent implements OnInit {

  constructor(private apiClient: ApiClientService,
    private configService: ConfigurationService) {
    var apiUrl = this.configService.getConfig().connectionsUrl;

    var serviceDocUrl = new URL(apiUrl + "/communities/service/atom/service")
    ServiceDocument.load(apiClient, serviceDocUrl)
  }

  ngOnInit() {
  }

}
