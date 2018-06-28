import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../shared/services/projects.service';
import { Project } from '../../../shared/models/assignment.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  _projects: Project[];
  _projectTitle: string;
  constructor(private _projectServ: ProjectsService, private toast: ToastrService) {}

  ngOnInit() {
    this._projectServ.getProjects().subscribe(data => {
      this._projects = data;
    });
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      this.addProject();
    }
  }

  addProject() {
    let _newProject: Project = {
      title: this._projectTitle,
      active: true
    };
    this._projectServ.createProject(_newProject).subscribe(data => {
      this.toast.success('Proyecto creado!', data.title);
      this._projectTitle = '';
      this._projects.push(data);
    });
  }
}
