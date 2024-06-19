import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  roles: string[] = [];
  components: { name: string, img: string, route: string }[] = [
    { name: 'Tratamientos', img: 'assets/tratamientos.png', route: '/tratamientos' },
    { name: 'Mensajes', img: 'assets/mensajes.png', route: '/mensajes' },
    { name: 'Roles', img: 'assets/roles.png', route: '/roles' },
    { name: 'Recetas', img: 'assets/recetas.png', route: '/recetas' },
    { name: 'Tipo de Material', img: 'assets/tipomaterial.png', route: '/tipodematerial' },
    { name: 'Exámenes', img: 'assets/examenes.png', route: '/examenes' },
    { name: 'Usuarios', img: 'assets/usuarios.png', route: '/usuarios' },
    { name: 'Respuestas', img: 'assets/respuestas.png', route: '/respuestas' },
    { name: 'Historial Clínico', img: 'assets/historialclinico.png', route: '/historialclinico' },
    { name: 'Metas', img: 'assets/metas.png', route: '/metas' },
    { name: 'Citas', img: 'assets/citas.png', route: '/citas' },
    { name: 'Materiales', img: 'assets/materiales.png', route: '/materiales' },
    { name: 'Detalle Clínico', img: 'assets/detalleclinico.png', route: '/detalleclinico' },
    { name: 'Horario Médico', img: 'assets/horariomedico.png', route: '/horariomedico' }
  ];
  visibleComponents: { name: string, img: string, route: string }[] = [];

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.roles = this.loginService.getUserRoles();
    console.log('User Roles:', this.roles); // Verifica que los roles se están obteniendo correctamente
    this.filterComponentsByRole();
    console.log('Visible Components:', this.visibleComponents); // Verifica que los componentes visibles se están filtrando correctamente
  }

  filterComponentsByRole(): void {
    if (this.roles.includes('ADMINISTRADOR')) {
      this.visibleComponents = this.components;
    } else if (this.roles.includes('PSICOLOGO')) {
      this.visibleComponents = this.components.filter(comp =>
        comp.route !== '/roles' &&
        comp.route !== '/usuarios' &&
        comp.route !== '/materiales'
      );
    } else if (this.roles.includes('PACIENTE')) {
      this.visibleComponents = this.components.filter(comp =>
        comp.route === '/respuestas' ||
        comp.route === '/mensajes' ||
        comp.route === '/metas'
      );
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
