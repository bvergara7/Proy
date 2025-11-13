// Pantalla principal "Mis Cursos" para el estudiante.
// Muestra las asignaturas matriculadas, su progreso y accesos rápidos.
// Pensado para entregar una vista clara y poco sobrecargada para usuarios TEA.
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonPage, IonApp, IonButton, IonCard, IonCardContent, IonCardTitle, IonProgressBar, IonItem, IonList,
  IonAvatar, IonGrid, IonRow, IonCol, IonAlert, IonToast, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenu, IonMenuButton, IonMenuToggle, IonIcon, IonLabel } from '@ionic/react';
import { homeOutline, settingsOutline, libraryOutline, chatbubblesOutline, helpCircleOutline, schoolOutline, personOutline, calculatorOutline, planetOutline, codeSlashOutline, playOutline, documentTextOutline,
  calendarOutline, documentOutline, trophyOutline, bookOutline, informationCircleOutline, enterOutline, closeOutline } from 'ionicons/icons';

// Estructura de datos para representar cada curso del estudiante
// Incluye código, progreso, cantidad de lecciones y ruta para navegar.
interface CourseData {
  id: string;
  name: string;
  code: string;
  progress: number;
  icon: string;
  color: string;
  description: string;
  instructor: string;
  totalLessons: number;
  completedLessons: number;
  route: string;
}

interface AnnouncementData {
  id: string;
  date: string;
  message: string;
}

// Estructura para anuncios o mensajes informativos del sistema/docentes

const InicioCursosEstudiante: React.FC = () => {
  const history = useHistory();
  // Controla qué opción del menú principal está seleccionada
  const [selectedTab, setSelectedTab] = useState<string>('inicio');
   // Estados para modales, alertas y toasts (feedback visual al usuario)
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  
  const [studentData] = useState({
    name: '',
    avatar: ''
  });
  
// Lista de cursos simulada. Cada curso incluye descripción y enlace a su pantalla específica.

  const [coursesData] = useState<CourseData[]>([
    {
      id: '1',
      name: 'Cálculo Diferencial e Integral',
      code: 'MAT1002',
      progress: 75,
      icon: 'calculator-outline',
      color: '#4a90c2',
      description: 'Esta asignatura presenta los contenidos fundamentales del Cálculo Diferencial y el Cálculo Integral de funciones reales para la resolución de problemas de ingeniería.',
      instructor: '',
      totalLessons: 20,
      completedLessons: 15,
      route: '/CalculoCurso'
    },
    {
      id: '2',
      name: 'Física para Ingeniería',
      code: 'FIS1002',
      progress: 45,
      icon: 'planet-outline',
      color: '#7db8a8',
      description: 'Principios fundamentales de la física aplicada a la ingeniería.',
      instructor: '',
      totalLessons: 18,
      completedLessons: 8,
      route: '/FisicaCurso'
    },
    {
      id: '3',
      name: 'Fundamentos de Programación',
      code: 'INF1214',
      progress: 90,
      icon: 'code-slash-outline',
      color: '#28a745',
      description: 'Introducción a la programación en C con conceptos básicos.',
      instructor: '',
      totalLessons: 25,
      completedLessons: 23,
      route: '/ProgramacionCurso'
    }
  ]);
  // Anuncios visibles en la pantalla (recordatorios, novedades, etc.)
  const [announcements] = useState<AnnouncementData[]>([
    {
      id: '1',
      date: '08 Noviembre 2025',
      message: 'Recordatorio: Entrega de proyecto final de Fundamentos de Programación.'
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
  
  // Al hacer clic en "Ingresar al curso", se abre una alerta de confirmación

  const handleEnterCourse = (course: CourseData) => {
    setSelectedCourse(course);
    setShowAlert(true);
  };
  
  // Al hacer clic en "Ingresar al curso", se abre una alerta de confirmación

  const confirmEnterCourse = () => {
    if (selectedCourse) {
      setToastMessage(`Ingresando al curso: ${selectedCourse.name}`);
      setShowToast(true);
      
      setTimeout(() => {
        history.push(selectedCourse.route);
      }, 1000);
      
      console.log(`Navegando al curso: ${selectedCourse.id} - Ruta: ${selectedCourse.route}`);
    }
    setShowAlert(false);
    setSelectedCourse(null);
  };
  // Abre el modal con instrucciones de uso de la pantalla "Mis Cursos"
  const handleShowInstructions = () => {
    setShowInstructionsModal(true);
  };
 // Función genérica para accesos rápidos
  const handleQuickAccess = (section: string) => {
    console.log(`Accediendo a: ${section}`);
  };
  
  // Navegación desde el menú hamburguesa. Cierra el menú antes de cambiar de ruta
  // y usa un flag para evitar múltiples clics seguidos.
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
  // Devuelve el ícono correspondiente según el nombre guardado en CourseData
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

  // Componente Header personalizado con menú hamburguesa
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

  // Componente para tarjetas de curso, tarjetas individuales de curso: icono, nombre, código, descripción y barra de progreso.
  // Diseño con mucha jerarquía visual para facilitar la lectura rápida.
  const CourseCard: React.FC<{ course: CourseData }> = ({ course }) => (
    <IonCard style={{ 
      margin: '16px 0', 
      borderRadius: '12px', 
      background: '#ffffff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      border: '1px solid rgba(116, 118, 126, 0.1)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    }}>
      <IonCardContent style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: `linear-gradient(135deg, ${course.color} 0%, #7db8a8 100%)`,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}>
            <IonIcon icon={getIconComponent(course.icon)} style={{ fontSize: '28px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <IonCardTitle style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#2c3e50', 
              marginBottom: '4px',
              lineHeight: '1.2'
            }}>
              {course.name}
            </IonCardTitle>
            <div style={{ fontSize: '14px', color: '#7f8c8d', marginBottom: '8px' }}>
              {course.code} • {course.instructor}
            </div>
            <div style={{ fontSize: '14px', color: '#5a6c7d', lineHeight: '1.4' }}>
              {course.description}
            </div>
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
            <span>{course.progress}% ({course.completedLessons}/{course.totalLessons} lecciones)</span>
          </div>
          <IonProgressBar 
            value={course.progress / 100} 
            style={{
              height: '10px',
              borderRadius: '5px',
              '--progress-background': `linear-gradient(90deg, ${course.color} 0%, #7db8a8 100%)`
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <IonButton
            expand="block"
            fill="solid"
            onClick={() => handleEnterCourse(course)}
            style={{
              '--background': `linear-gradient(135deg, ${course.color} 0%, #7db8a8 100%)`,
              '--border-radius': '8px',
              '--box-shadow': '0 2px 8px rgb(255, 255, 255)',
              flex: 2,
              fontWeight: 'bold'
            }}
          >
            <IonIcon icon={enterOutline} slot="start" />
            Ingresar al Curso
          </IonButton>
          <IonButton
            fill="outline"
            onClick={() => handleShowInstructions()}
            style={{
              '--border-color': course.color,
              '--color': course.color,
              '--border-radius': '8px',
              flex: 1,
              minWidth: '120px'
            }}
          >
            <IonIcon icon={informationCircleOutline} slot="start" />
            Ayuda
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );

  // Modal de instrucciones con fondo blanco
  const InstructionsModal: React.FC = () => (
    <IonModal isOpen={showInstructionsModal} onDidDismiss={() => setShowInstructionsModal(false)}>
      <IonHeader>
        <IonToolbar style={{ '--background': '#ffffff' }}>
          <IonTitle style={{ color: '#2c3e50' }}>Instrucciones de Acceso</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowInstructionsModal(false)} style={{ '--color': '#2c3e50' }}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{ 
        '--padding-top': '20px', 
        '--padding-start': '20px', 
        '--padding-end': '20px',
        '--background': '#ffffff'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>¿Cómo acceder a tus cursos?</h3>
          
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#4a90c2', marginBottom: '12px' }}>1. Seleccionar un curso</h4>
            <p style={{ color: '#5a6c7d', lineHeight: '1.6' }}>
              En la pantalla principal verás todas tus materias matriculadas con su información básica, 
              progreso actual y descripción.
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#4a90c2', marginBottom: '12px' }}>2. Ingresar al curso</h4>
            <p style={{ color: '#5a6c7d', lineHeight: '1.6' }}>
              Haz clic en el botón <strong>"Ingresar al Curso"</strong> para acceder al contenido completo, 
              materiales de estudio, tareas y evaluaciones.
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#4a90c2', marginBottom: '12px' }}>3. Navegación dentro del curso</h4>
            <p style={{ color: '#5a6c7d', lineHeight: '1.6' }}>
              Una vez dentro encontrarás: contenido de las lecciones, actividades interactivas, 
              instrucciones y progreso del curso.
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#4a90c2', marginBottom: '12px' }}>4. Seguimiento del progreso</h4>
            <p style={{ color: '#5a6c7d', lineHeight: '1.6' }}>
              El sistema registra tu progreso. Puedes ver el avance en la barra 
              de progreso de cada curso.
            </p>
          </div>

          <div style={{ 
            background: '#f8f9fb', 
            padding: '16px', 
            borderRadius: '8px', 
            marginTop: '24px',
            border: '1px solid #e3e6ea'
          }}>
            <h5 style={{ color: '#2c3e50', marginBottom: '8px' }}>💡 Consejo</h5>
            <p style={{ color: '#5a6c7d', lineHeight: '1.6', margin: 0 }}>
              Si necesitas ayuda adicional, puedes contactar a tu profesor directamente 
              desde la sección de comunicación o visualizar sección de ayuda.
            </p>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );

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

      <IonPage id="main-content">
        <CustomHeader />
        <IonContent style={{ '--background': '#f8f9fb' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <IonGrid>
              <IonRow>
                <IonCol size="12" size-lg="8">
                  <div style={{ marginBottom: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h2 style={{ 
                        fontSize: '28px', 
                        fontWeight: 'bold', 
                        color: '#2c3e50', 
                        margin: 0
                      }}>
                        Mis Cursos 
                      </h2>
                      <IonButton
                        fill="outline"
                        size="small"
                        onClick={() => handleShowInstructions()}
                        style={{
                          '--border-color': '#4a90c2',
                          '--color': '#4a90c2'
                        }}
                      >
                        <IonIcon icon={informationCircleOutline} slot="start" />
                        Instrucciones
                      </IonButton>
                    </div>
                    <p style={{ color: '#7f8c8d', fontSize: '16px', marginBottom: '24px' }}>
                      
                    </p>
                    {coursesData.map(course => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                </IonCol>
                <IonCol size="12" size-lg="4">
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </IonContent>
      </IonPage>

      {/* Modal de instrucciones */}
      <InstructionsModal />

      {/* Alerta de confirmación para ingresar al curso con fondo blanco */}
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Confirmar acceso"
        message={selectedCourse ? `¿Deseas ingresar al curso "${selectedCourse.name}"?` : ''}
        cssClass="custom-alert"
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'alert-cancel-button'
          },
          {
            text: 'Ingresar',
            handler: confirmEnterCourse,
            cssClass: 'alert-confirm-button'
          }
        ]}
      />

      {/* Toast de confirmación */}
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={3000}
        position="top"
        color="success"
      />

      {/* Estilos CSS para la alerta personalizada */}
      <style>
        {`
          .custom-alert {
            --background: #ffffff !important;
            --color: #2c3e50 !important;
          }
          
          .custom-alert .alert-wrapper {
            background: #ffffff !important;
            box-shadow: 0 4px 16px rgba(0,0,0,0.15) !important;
            border-radius: 12px !important;
          }
          
          .custom-alert .alert-head {
            background: #ffffff !important;
            color: #2c3e50 !important;
            font-weight: bold !important;
          }
          
          .custom-alert .alert-message {
            background: #ffffff !important;
            color: #5a6c7d !important;
          }
          
          .alert-cancel-button {
            color: #7f8c8d !important;
          }
          
          .alert-confirm-button {
            color: #4a90c2 !important;
            font-weight: bold !important;
          }
        `}
      </style>
    </IonApp>
  );
};

export default InicioCursosEstudiante;
