import { Route, RouterModule} from "@angular/router";
import { MycrudComponent } from "./mycrud/mycrud.component";
import { NgModule } from "@angular/core";
import { MyHomeComponent } from "./my-home/my-home.component";

const routes : Route[]=[
    {path:"mycrud",component:MycrudComponent},
    {path:"home", component:MyHomeComponent},
    // {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"***",redirectTo:"home",pathMatch:"full"},
];

@NgModule ({
    imports:[
        RouterModule.forRoot(routes)
    ]
})


export class AppRoutingModule{}