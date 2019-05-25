import { Component } from '@angular/core';
import { EventService } from '../../services/event/event.service'

@Component({
    selector: 'excel',
    templateUrl: './excel.html'
})

export class ExcelComponent {
    constructor(private eventService: EventService) {
        this.eventService.Register("excel", (data: any) => {
            // let dataSource = {
            //     data: [
            //         {
            //             name: "יונתן צור",
            //             age: 49
            //         },
            //         {
            //             name: "נופר ישראלי",
            //             age: 56
            //         }
            //     ],
            //     columns: [
            //         {
            //             dataField: "name",
            //             displayName: "שם"
            //         },
            //         {
            //             dataField: "age",
            //             displayName: "גיל"
            //         }
            //     ]
            // };

            this.excelExport(data)
        });
    }

    createExportHeader(dataSource: any, separator: any) {
        var headerRow = "",
            columns = dataSource.columns,
            newLine = "\r\n";

        for (var i = 0; i < columns.length; i++) {
            headerRow += (i > 0 ? separator : '') + columns[i].displayName;
        }
        return headerRow + newLine;
    }

    createExportRows(dataSource: any, separator: any) {
        var content = "",
            columns = dataSource.columns,
            data = dataSource.data,
            newLine = "\r\n",
            dataField;

        for (var j = 0; j < data.length; j++) {
            for (var i = 0; i < columns.length; i++) {
                dataField = columns[i].dataField;
                content += (i > 0 ? separator : '') + data[j][dataField];
            }
            content += newLine;
        }
        return content;
    }

    excelExport(dataSource: any) {
        var separator = ',';
        var content = this.createExportHeader(dataSource, separator);
        content += this.createExportRows(dataSource, separator);

        // An anchor html element on the page (or create dynamically one)
        // to use its download attribute to set filename
        let a: any = document.getElementById('csv');
        a.textContent = 'download';
        a.download = "MyFile.csv";
        a.href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(content);
        a.click();
    }
}