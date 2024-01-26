import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Authentication/Login.vue'
import Register from '../views/Authentication/Register.vue'
import Communities from '../views/CommunityManagement/Communities.vue'
import AddCommunity from '../views/CommunityManagement/AddCommunity.vue'
import EditCommunity from '../views/CommunityManagement/EditCommunity.vue'
import CommunityDetails from '../views/CommunityManagement/CommunityDetails.vue'
import MapDetails from '../views/CommunityManagement/MapDetails.vue'
import Buildings from '../views/BuildingManagement/Buildings.vue'
import AddBuilding from '../views/BuildingManagement/AddBuilding.vue'
import EditBuilding from '../views/BuildingManagement/EditBuilding.vue'
import BuildingDetails from '../views/BuildingManagement/BuildingDetails.vue'
import Users from '../views/UserManagement/Users.vue'
import Bills from '../views/BillManagement/Bills.vue'
import Maintenance from '../views/MaintenanceRequests/Maintenance.vue'
import Complaints from '../views/ComplaintsManagement/Complaints.vue'
// 其他导入...

const routes = [
    { path: '/', component: Home, name: 'Home' },
    { path: '/login', component: Login, name: 'Login' },
    { path: '/register', component: Register, name: 'Register' },

    { path: '/communities', component: Communities, name: 'Communities' },
    { path: '/communities/add', component: AddCommunity, name: 'AddCommunity' },
    { path: '/communities/edit/:communityId', component: EditCommunity, name: 'EditCommunity' },
    { path: '/communities/details/:communityId', component: CommunityDetails, name: 'CommunityDetails' },
    { path: '/communities/mapDetails/:communityId', component: MapDetails, name: 'MapDetails' },

    { path: '/buildings/:communityId', component: Buildings, name: 'Buildings' },
    { path: '/buildings/add/:communityId', component: AddBuilding, name: 'AddBuilding' },
    { path: '/buildings/edit/:buildingId', component: EditBuilding, name: 'EditBuilding' },
    { path: '/buildings/details/:buildingId', component: BuildingDetails, name: 'BuildingDetails' },

    { path: '/users', component: Users, name: 'Users' },
    { path: '/bills', component: Bills, name: 'Bills' },
    { path: '/maintenance', component: Maintenance, name: 'Maintenance' },
    { path: '/complaints', component: Complaints, name: 'Complaints' },
  // 其他路由...
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
