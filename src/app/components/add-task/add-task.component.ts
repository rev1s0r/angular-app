import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {UiService} from "../../services/ui.service";
import {Subscription} from "rxjs";
import { Task } from '../../Task';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text: string;
  day: Date;
  comment: string;
  reminder: boolean = false;
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService, public datepipe: DatePipe) {
    this.subscription = this.uiService.onToggle().subscribe(Value => this.showAddTask = Value);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.text) {
      alert('Please add a task')
      return;
    }

    const newTask = {
      text: this.text,
      day: this.datepipe.transform(this.day, 'dd/MM/yyyy ; HH:MM'),
      comment: this.comment,
      reminder: this.reminder,
    }

    this.onAddTask.emit(newTask);

    this.text = '';
    this.day = new Date();
    this.comment = '';
    this.reminder = false;
  }
}
