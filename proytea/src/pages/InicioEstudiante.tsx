// Importación de React y de los componentes necesarios de Ionic para la creación de la interfaz.
// Además, se incluyen los iconos de Ionicons para enriquecer la experiencia visual.

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  IonContent, IonPage, IonApp, IonButton, IonCard, IonCardContent, IonCardTitle, 
  IonProgressBar, IonItem, IonList, IonAvatar, IonGrid, IonRow, IonCol, IonIcon,
  IonLabel, IonMenu, IonHeader, IonToolbar, IonTitle, IonMenuButton, IonMenuToggle
} from '@ionic/react';
import { 
  homeOutline, settingsOutline, libraryOutline, chatbubblesOutline, helpCircleOutline,
  schoolOutline, personOutline, calculatorOutline, planetOutline, codeSlashOutline,
  playOutline, documentTextOutline, calendarOutline, documentOutline, trophyOutline,
  bookOutline, menuOutline
} from 'ionicons/icons';

//Define la estructura de cada curso, incluyendo su nombre, código, progreso y otros detalles.
interface CourseData {
  id: string;
  name: string;
  code: string;
  progress: number;
  icon: string;
  color: string;
}

interface AnnouncementData {
  id: string;
  date: string;
  message: string;
}

const InicioEstudiante: React.FC = () => {
  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState<string>('inicio');
  const [isNavigating, setIsNavigating] = useState(false);
  const [studentData] = useState({
    name: '',
    avatar: ''
  });
  
  const [coursesData] = useState<CourseData[]>([
    {
      id: '1',
      name: 'Fundamentos de Matemáticas',
      code: 'MAT1001',
      progress: 75,
      icon: 'calculator-outline',
      color: '#4a90c2'
    },
    {
      id: '2',
      name: 'Física para Ingeniería',
      code: 'FIS1002',
      progress: 45,
      icon: 'planet-outline',
      color: '#7db8a8'
    },
    {
      id: '3',
      name: 'Fundamentos de Programación',
      code: 'INF1214',
      progress: 90,
      icon: 'code-slash-outline',
      color: '#28a745'
    }
  ]);

  const [announcements] = useState<AnnouncementData[]>([
    {
      id: '1',
      date: '08 Noviembre 2025',
      message: 'Recordatorio: Entrega de proyecto final de Programación I.'
    },
    {
      id: '2',
      date: '04 Septiembre 2025',
      message: 'Nuevo material disponible en MAT1001 - Fundamentos de Matemáticas.'
    },
    {
      id: '3',
      date: '05 Agosto 2025',
      message: 'Horarios de atención docente actualizados en la sección de ayuda.'
    }
  ]);


// handleContinueActivity(): Función que simula continuar con la actividad de un curso específico.
// handleViewInstructions(): Muestra las instrucciones del curso seleccionado.
// handleQuickAccess(): Accede rápidamente a secciones como calendario o biblioteca, dependiendo de la opción seleccionada.
// getIconComponent(): Devuelve el componente de ícono adecuado según el nombre del ícono proporcionado.
// handleMenuNavigation(): Controla la navegación entre diferentes secciones de la aplicación (Inicio, Cursos, Comunicación, etc.).

  const handleContinueActivity = (courseId: string) => {
    console.log(`Continuando actividad del curso: ${courseId}`);
  };

  const handleViewInstructions = (courseId: string) => {
    console.log(`Viendo instrucciones del curso: ${courseId}`);
  };

  const handleQuickAccess = (section: string) => {
    console.log(`Accediendo a: ${section}`);
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'calculator-outline':
        return calculatorOutline;
      case 'planet-outline':
        return planetOutline;
      case 'code-slash-outline':
        return codeSlashOutline;
      default:
        return libraryOutline;
    }
  };
  const handleMenuNavigation = async (section: string, route: string) => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    setSelectedTab(section);
    
    try {
      // Cerrar el menú antes de navegar
      const menu = document.querySelector('ion-menu');
      if (menu) {
        await menu.close();
      }
      
      // Pequeña pausa para que se cierre el menú
      setTimeout(() => {
        history.push(route);
        setIsNavigating(false);
      }, 150);
    } catch (error) {
      console.error('Error al navegar:', error);
      setIsNavigating(false);
    }
  };

  // Componente Header personalizado con menú hamburguesa
  //Además incluye icono educativo.
  const CustomHeader: React.FC = () => (
    <IonHeader>
      <IonToolbar style={{ 
        '--background': 'linear-gradient(135deg, #4a90c2 0%, #7db8a8 100%)',
        '--color': 'white'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <IonMenuButton style={{ color: 'white' }} />
            <div style={{
              width: '32px',
              height: '32px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <IonIcon icon={schoolOutline} style={{ fontSize: '20px' }} />
            </div>
            <IonTitle></IonTitle>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px' }}>{studentData.name}</span>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <IonIcon icon={personOutline} style={{ fontSize: '18px' }} />
            </div>
          </div>
        </div>
      </IonToolbar>
    </IonHeader>
  );

  // Componente para tarjetas de curso
  const CourseCard: React.FC<{ course: CourseData }> = ({ course }) => (
    <IonCard style={{ 
      margin: '16px 0', 
      borderRadius: '12px', 
      background: '#ffffff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid rgba(116, 118, 126, 0.1)'
    }}>
      <IonCardContent style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: `linear-gradient(135deg, ${course.color} 0%, #7db8a8 100%)`,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <IonIcon icon={getIconComponent(course.icon)} style={{ fontSize: '24px' }} />
          </div>
          <div>
            <IonCardTitle style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              color: '#2c3e50', 
              marginBottom: '4px' 
            }}>
              {course.name}
            </IonCardTitle>
            <div style={{ fontSize: '14px', color: '#7f8c8d' }}>{course.code}</div>
          </div>
        </div>
        
        <div style={{ margin: '16px 0' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '8px', 
            fontSize: '14px', 
            color: '#5a6c7d' 
          }}>
            <span>Progreso del curso</span>
            <span>{course.progress}%</span>
          </div>
          <IonProgressBar 
            value={course.progress / 100} 
            style={{
              height: '8px',
              borderRadius: '4px',
              '--progress-background': `linear-gradient(90deg, ${course.color} 0%, #7db8a8 100%)`
            }}
          />
        </div>
      </IonCardContent>
    </IonCard>
  );

  // Componente para acceso rápido
  const QuickAccessCard: React.FC = () => (
    <IonCard style={{ 
      borderRadius: '12px', 
      boxShadow: '0 2px 8px rgba(255, 255, 255, 0.96)',
      border: '1px solid rgb(255, 255, 255)',
      marginBottom: '20px'
    }}>
      <IonCardContent style={{ padding: '20px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2c3e50', marginBottom: '16px' }}>
          Acceso Rápido
        </h4>
        <IonList style={{ background: 'transparent' }}>
          <IonItem 
            button 
            onClick={() => handleQuickAccess('calendario')}
            style={{ 
              '--background': '#f8f9fb', 
              '--border-radius': '8px', 
              marginBottom: '8px'
            }}
          >
            <IonIcon icon={calendarOutline} slot="start" color="primary" />
            <IonLabel>Mi Calendario</IonLabel>
          </IonItem>
          <IonItem 
            button 
            onClick={() => handleQuickAccess('biblioteca')}
            style={{ 
              '--background': '#f8f9fb', 
              '--border-radius': '8px'
            }}
          >
            <IonIcon icon={bookOutline} slot="start" color="primary" />
            <IonLabel>Libros</IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );

// IonMenu: Menú lateral tipo hamburguesa que permite al usuario navegar entre secciones principales como "Inicio", 
// "Mis Cursos", "Configuración" y "Ayuda". Cada item del menú tiene un icono y un estilo de resaltado 
// para indicar qué sección está activa en ese momento.
  return (
    <IonApp>
      {/* Menú lateral tipo hamburguesa */}
      <IonMenu menuId="main-menu" contentId="main-content" type="overlay">
        <IonHeader>
          <IonToolbar style={{ 
            '--background': 'linear-gradient(135deg, #4a90c2 0%, #7db8a8 100%)',
            '--color': 'white'
          }}>
            <IonTitle>Menú Principal</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent style={{ '--background': '#ffffff' }}>
          <IonList style={{ background: 'transparent', padding: '16px 0' }}>
            <IonMenuToggle autoHide={false}>
              <IonItem 
                button 
                onClick={() => handleMenuNavigation('inicio', '/Inicio')}
                style={{ 
                  '--background': selectedTab === 'inicio' ? '#f0f8ff' : 'transparent',
                  '--color': selectedTab === 'inicio' ? '#4a90c2' : '#2c3e50',
                  margin: '4px 8px',
                  '--border-radius': '8px'
                }}
              >
                <IonIcon icon={homeOutline} slot="start" />
                <IonLabel>Inicio</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle autoHide={false}>
              <IonItem 
                button 
                onClick={() => handleMenuNavigation('cursos', '/Cursos')}
                style={{ 
                  '--background': selectedTab === 'cursos' ? '#f0f8ff' : 'transparent',
                  '--color': selectedTab === 'cursos' ? '#4a90c2' : '#2c3e50',
                  margin: '4px 8px',
                  '--border-radius': '8px'
                }}
              >
                <IonIcon icon={libraryOutline} slot="start" />
                <IonLabel>Mis Cursos</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle autoHide={false}>
              <IonItem 
                button 
                onClick={() => handleMenuNavigation('comunicacion', '/Comunicacion')}
                style={{ 
                  '--background': selectedTab === 'comunicacion' ? '#f0f8ff' : 'transparent',
                  '--color': selectedTab === 'comunicacion' ? '#4a90c2' : '#2c3e50',
                  margin: '4px 8px',
                  '--border-radius': '8px'
                }}
              >
                <IonIcon icon={chatbubblesOutline} slot="start" />
                <IonLabel>Comunicación</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle autoHide={false}>
              <IonItem 
                button 
                onClick={() => handleMenuNavigation('configuracion', '/Configuracion')}
                style={{ 
                  '--background': selectedTab === 'configuracion' ? '#f0f8ff' : 'transparent',
                  '--color': selectedTab === 'configuracion' ? '#4a90c2' : '#2c3e50',
                  margin: '4px 8px',
                  '--border-radius': '8px'
                }}
              >
                <IonIcon icon={settingsOutline} slot="start" />
                <IonLabel>Configuración</IonLabel>
              </IonItem>
            </IonMenuToggle>

            <IonMenuToggle autoHide={false}>
              <IonItem 
                button 
                onClick={() => handleMenuNavigation('ayuda', '/Ayuda')}
                style={{ 
                  '--background': selectedTab === 'ayuda' ? '#f0f8ff' : 'transparent',
                  '--color': selectedTab === 'ayuda' ? '#4a90c2' : '#2c3e50',
                  margin: '4px 8px',
                  '--border-radius': '8px'
                }}
              >
                <IonIcon icon={helpCircleOutline} slot="start" />
                <IonLabel>Ayuda</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>

      {/* Contenido principal */}
      <IonPage id="main-content">
        <CustomHeader />
        <IonContent style={{ '--background': '#ffffff' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <IonGrid>
              <IonRow>
                <IonCol size="12">
                  <div>
                    <h2 style={{ 
                      fontSize: '24px', 
                      fontWeight: 'bold', 
                      color: '#2c3e50', 
                      marginBottom: '8px' 
                    }}>
                      Inicio 
                    </h2>
                    {coursesData.map(course => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default InicioEstudiante;