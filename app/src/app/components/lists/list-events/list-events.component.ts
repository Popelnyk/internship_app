import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-list-events",
  templateUrl: "./list-events.component.html",
  styleUrls: ["./list-events.component.scss"],
})
export class ListEventsComponent {
  testEventsList: Array<any> = [{name: "foo1 bar tar loe", description: "bar is bar bar is bar bar is bar", date: "12.01.2002"},
    {name: "foo2", description: "bar is bar2", date: "11.11.2442"}];
}
