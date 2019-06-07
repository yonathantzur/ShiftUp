import { Component } from '@angular/core';
import { EventService } from '../../services/event/event.service'

@Component({
    selector: 'excel',
    templateUrl: './excel.html'
})

export class ExcelComponent {
    constructor(private eventService: EventService) {
        this.eventService.Register("excel", (exportInfo: any) => {
            this.excelExport(exportInfo.dataSource, exportInfo.fileName)
        });
    }

    createExportHeader(dataSource: any, separator: any) {
        let headerRow = "",
            columns = dataSource.columns,
            newLine = "\r\n";

        for (let i = 0; i < columns.length; i++) {
            headerRow += (i > 0 ? separator : '') + (columns[i].displayName || '');
        }
        return headerRow + newLine;
    }

    createExportRows(dataSource: any, separator: any) {
        let content = "",
            columns = dataSource.columns,
            data = dataSource.data,
            newLine = "\r\n",
            dataField;

        for (let j = 0; j < data.length; j++) {
            for (let i = 0; i < columns.length; i++) {
                dataField = columns[i].dataField || '';
                content += (i > 0 ? separator : '') + (data[j][dataField] || '');
            }

            content += newLine;
        }

        return content;
    }

    excelExport(dataSource: any, fileName: string) {
        let separator = ',';
        let content = this.createExportHeader(dataSource, separator);
        content += this.createExportRows(dataSource, separator);

        // An anchor html element on the page (or create dynamically one)
        // to use its download attribute to set filename
        let a: any = document.getElementById('csv');
        a.textContent = 'download';
        a.download = fileName + ".csv";
        a.href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(content);
        a.click();
    }
}