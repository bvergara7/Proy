import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  IonContent, IonPage, IonApp, IonButton, IonCard, IonCardContent, IonCardTitle, 
  IonProgressBar, IonItem, IonList, IonAvatar, IonGrid, IonRow, IonCol, IonIcon,
  IonLabel, IonMenu, IonHeader, IonToolbar, IonTitle, IonMenuButton, IonMenuToggle,
  IonAccordion, IonAccordionGroup, IonModal, IonButtons, IonBackButton
} from '@ionic/react';
import { 
  homeOutline, settingsOutline, libraryOutline, chatbubblesOutline, helpCircleOutline,
  schoolOutline, personOutline, calculatorOutline, planetOutline, codeSlashOutline,
  playOutline, documentTextOutline, calendarOutline, documentOutline, trophyOutline,
  bookOutline, menuOutline, videocamOutline, mailOutline, closeOutline
} from 'ionicons/icons';

interface CategoryData {
  id: string;
  name: string;
  icon: string;
  description: string;
  type: 'tutorial' | 'video' | 'document' | 'contact';
}

interface FAQData {
  id: string;
  question: string;
  answer: string;
}

interface TutorialData {
  id: string;
  title: string;
  description: string;
  pdfPath: string;
}

interface VideoData {
  id: string;
  title: string;
  description: string;
  videoPath: string;
}

const AyudaEstudiante: React.FC = () => {
  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState<string>('ayuda');
  const [isNavigating, setIsNavigating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    type: 'pdf' | 'video' | null;
    title: string;
    content: string;
  }>({
    type: null,
    title: '',
    content: ''
  });

  const [studentData] = useState({
    name: '',
    avatar: ''
  });

  // Datos de tutoriales (PDFs)
  const [tutorialsData] = useState<TutorialData[]>([
    {
      id: '1',
      title: 'Guía de Inicio Rápido',
      description: 'Aprende a usar la plataforma paso a paso',
      pdfPath: 'src/help/Tutorial.pdf' 
    },
  ]);

  // Datos de videos 
  const [videosData] = useState<VideoData[]>([
    {
      id: '1',
      title: 'Introducción a la Plataforma',
      description: 'Video explicativo de las funciones principales',
      videoPath: 'src/help/Video_App.mp4' // CAMBIO: Removido /src/ y espacios en el nombre
    },
  ]);

  const [categoriesData] = useState<CategoryData[]>([
    {
      id: '1',
      name: 'Tutoriales',
      icon: 'play-outline',
      description: 'Guías paso a paso para usar la plataforma',
      type: 'tutorial'
    },
    {
      id: '2',
      name: 'Videos Explicativos',
      icon: 'videocam-outline',
      description: 'Contenido audiovisual de apoyo',
      type: 'video'
    },
    {
      id: '3',
      name: 'Documentación',
      icon: 'document-text-outline',
      description: 'Documentos de referencia',
      type: 'document'
    },
    {
      id: '4',
      name: 'Contactar Soporte',
      icon: 'mail-outline',
      description: 'Obtén ayuda personalizada',
      type: 'contact'
    }
  ]);

  const [faqData] = useState<FAQData[]>([
    {
      id: '1',
      question: '¿Cómo puedo cambiar el tamaño del texto?',
      answer: 'Puedes cambiar el tamaño del texto desde la sección de Configuración > Accesibilidad > Tamaño de texto. Allí encontrarás diferentes opciones para ajustar el tamaño según tus necesidades.'
    },
    {
      id: '2',
      question: '¿Qué hago si no entiendo una instrucción?',
      answer: 'Si no entiendes una instrucción específica, puedes: 1) Revisar los tutoriales relacionados, 2) Ver los videos explicativos, 3) Contactar a tu profesor a través del módulo de comunicación, o 4) Usar el chat de soporte técnico.'
    },
    {
      id: '3',
      question: '¿Cómo funciona el módulo de comunicación?',
      answer: 'El módulo de comunicación te permite enviar mensajes a tus profesores, participar en foros de discusión, y recibir notificaciones importantes. Puedes acceder desde la pestaña "Comunicación" en la barra inferior.'
    },
    {
      id: '4',
      question: '¿Puedo pausar una actividad y continuar después?',
      answer: 'Sí, todas las actividades se guardan automáticamente. Puedes salir en cualquier momento y al regresar, encontrarás tu progreso exactamente donde lo dejaste. El sistema guarda cada respuesta inmediatamente.'
    },
    {
      id: '5',
      question: '¿Qué significa la barra de progreso?',
      answer: 'La barra de progreso muestra qué porcentaje del curso has completado. Se actualiza automáticamente conforme completas lecciones, tareas y evaluaciones. Un 100% significa que has terminado todos los elementos del curso.'
    }
  ]);

  // Función para abrir PDF
  const openPDF = (pdfPath: string, title: string) => {
    setModalContent({
      type: 'pdf',
      title: title,
      content: pdfPath
    });
    setIsModalOpen(true);
  };

  // Función para abrir video
  const openVideo = (videoPath: string, title: string) => {
    setModalContent({
      type: 'video',
      title: title,
      content: videoPath
    });
    setIsModalOpen(true);
  };

  // Función para mostrar lista de tutoriales
  const showTutorialsList = () => {
    setModalContent({
      type: 'pdf',
      title: 'Selecciona un Tutorial',
      content: 'list'
    });
    setIsModalOpen(true);
  };

  // Función para mostrar lista de videos
  const showVideosList = () => {
    setModalContent({
      type: 'video',
      title: 'Selecciona un Video',
      content: 'list'
    });
    setIsModalOpen(true);
  };

  const handleCategoryClick = (category: CategoryData) => {
    console.log(`Accediendo a categoría: ${category.id}`);
    
    switch (category.type) {
      case 'tutorial':
        showTutorialsList();
        break;
      case 'video':
        showVideosList();
        break;
      case 'document':
        // Aquí puedes agregar lógica para documentos
        alert('Sección de documentación en desarrollo');
        break;
      case 'contact':
        // Aquí puedes agregar lógica para contacto
        alert('Redirigiendo al formulario de contacto...');
        break;
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'play-outline':
        return playOutline;
      case 'videocam-outline':
        return videocamOutline;
      case 'document-text-outline':
        return documentTextOutline;
      case 'mail-outline':
        return mailOutline;
      default:
        return helpCircleOutline;
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

  // Componente para las categorías de ayuda
  const CategoryCard: React.FC<{ category: CategoryData }> = ({ category }) => (
    <IonCard 
      style={{ 
        margin: '16px 0', 
        borderRadius: '12px', 
        background: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid rgba(116, 118, 126, 0.1)',
        cursor: 'pointer'
      }}
      onClick={() => handleCategoryClick(category)}
    >
      <IonCardContent style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #4a90c2 0%, #7db8a8 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <IonIcon icon={getIconComponent(category.icon)} style={{ fontSize: '24px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <IonCardTitle style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              color: '#2c3e50', 
              marginBottom: '4px' 
            }}>
              {category.name}
            </IonCardTitle>
            <div style={{ fontSize: '14px', color: '#7f8c8d' }}>{category.description}</div>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );

  // Componente para acciones rápidas
  const QuickActionsCard: React.FC = () => (
    <IonCard style={{ 
      borderRadius: '12px', 
      boxShadow: '0 2px 8px rgb(255, 255, 255)',
      border: '1px solid rgb(0, 0, 0)',
      background: '#ffffff',
      marginBottom: '20px'
    }}>
      <IonCardContent style={{ padding: '20px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2c3e50', marginBottom: '16px' }}>
          Acciones Rápidas
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <IonButton 
            fill="solid" 
            style={{ 
              '--background': 'linear-gradient(135deg, #4a90c2 0%, #7db8a8 100%)',
              '--border-radius': '8px',
              height: '48px'
            }}
            onClick={showTutorialsList}
          >
            <IonIcon icon={playOutline} slot="start" />
            TUTORIAL
          </IonButton>
          
          <IonButton 
            fill="outline" 
            style={{ 
              '--border-color': '#7f8c8d',
              '--color': '#7f8c8d',
              '--border-radius': '8px',
              height: '48px'
            }}
            onClick={showVideosList}
          >
            <IonIcon icon={videocamOutline} slot="start" />
            VIDEOS
          </IonButton>
          
          <IonButton 
            fill="solid" 
            style={{ 
              '--background': 'linear-gradient(135deg, #4a90c2 0%, #7db8a8 100%)',
              '--border-radius': '8px',
              height: '48px'
            }}
            onClick={() => alert('Redirigiendo al formulario de contacto...')}
          >
            <IonIcon icon={mailOutline} slot="start" />
            CONTACTAR
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );

  // Componente para preguntas frecuentes
  const FAQCard: React.FC = () => (
    <IonCard style={{ 
      borderRadius: '12px', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid rgba(116, 118, 126, 0.1)',
      marginBottom: '20px',
      background: '#ffffff'
    }}>
      <IonCardContent style={{ padding: '20px', background: '#ffffff' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2c3e50', marginBottom: '16px' }}>
          Preguntas Frecuentes
        </h4>
        
        <IonAccordionGroup style={{ background: '#ffffff' }}>
          {faqData.map((faq) => (
            <IonAccordion key={faq.id} value={faq.id} style={{ background: '#ffffff', marginBottom: '8px' }}>
              <IonItem 
                slot="header" 
                style={{ 
                  '--background': '#f8f9fb', 
                  '--border-radius': '8px', 
                  marginBottom: '8px',
                  background: '#f8f9fb',
                  borderRadius: '8px'
                }}
              >
                <IonLabel style={{ color: '#2c3e50', fontWeight: '500' }}>
                  {faq.question}
                </IonLabel>
              </IonItem>
              <div slot="content" style={{ 
                padding: '16px', 
                backgroundColor: '#ffffff', 
                borderRadius: '0 0 8px 8px',
                border: '1px solid #f0f0f0',
                borderTop: 'none'
              }}>
                <p style={{ color: '#5a6c7d', lineHeight: '1.5', margin: 0 }}>
                  {faq.answer}
                </p>
              </div>
            </IonAccordion>
          ))}
        </IonAccordionGroup>
      </IonCardContent>
    </IonCard>
  );

  // CORREGIDO: Modal mejorado con mejor manejo de errores
  const ContentModal: React.FC = () => (
    <IonModal 
      isOpen={isModalOpen} 
      onDidDismiss={() => setIsModalOpen(false)}
    >
      <IonHeader>
        <IonToolbar style={{ 
          '--background': 'linear-gradient(135deg, #4a90c2 0%, #7db8a8 100%)',
          '--color': 'white'
        }}>
          <IonTitle>{modalContent.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsModalOpen(false)}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent 
        style={{ 
          '--background': '#ffffff', 
          background: '#ffffff',
          height: '100%',
          '--padding-start': '0',
          '--padding-end': '0',
          '--padding-top': '0',
          '--padding-bottom': '0'
        }}
      >
        {modalContent.content === 'list' && modalContent.type === 'pdf' && (
          <div style={{ padding: '20px', background: '#ffffff' }}>
            <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>Selecciona un tutorial:</h3>
            {tutorialsData.map((tutorial) => (
              <IonCard 
                key={tutorial.id} 
                style={{ 
                  marginBottom: '16px', 
                  cursor: 'pointer',
                  borderRadius: '12px',
                  background: '#ffffff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(116, 118, 126, 0.1)'
                }}
                onClick={() => openPDF(tutorial.pdfPath, tutorial.title)}
              >
                <IonCardContent style={{ padding: '20px', background: '#ffffff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #4a90c2 0%, #7db8a8 100%)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <IonIcon icon={documentTextOutline} style={{ fontSize: '20px' }} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: '#2c3e50' }}>{tutorial.title}</h4>
                      <p style={{ margin: '4px 0 0 0', color: '#7f8c8d', fontSize: '14px' }}>
                        {tutorial.description}
                      </p>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        )}

        {modalContent.content === 'list' && modalContent.type === 'video' && (
          <div style={{ padding: '20px', background: '#ffffff' }}>
            <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>Selecciona un video:</h3>
            {videosData.map((video) => (
              <IonCard 
                key={video.id} 
                style={{ 
                  marginBottom: '16px', 
                  cursor: 'pointer',
                  borderRadius: '12px',
                  background: '#ffffff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(116, 118, 126, 0.1)'
                }}
                onClick={() => openVideo(video.videoPath, video.title)}
              >
                <IonCardContent style={{ padding: '20px', background: '#ffffff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #4a90c2 0%, #7db8a8 100%)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <IonIcon icon={videocamOutline} style={{ fontSize: '20px' }} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: '#2c3e50' }}>{video.title}</h4>
                      <p style={{ margin: '4px 0 0 0', color: '#7f8c8d', fontSize: '14px' }}>
                        {video.description}
                      </p>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        )}

        {modalContent.content !== 'list' && modalContent.type === 'pdf' && (
          <div style={{ 
            height: 'calc(100vh - 56px)', 
            width: '100%', 
            position: 'relative',
            background: '#ffffff'
          }}>
            <iframe
              src={modalContent.content}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                minHeight: '600px'
              }}
              title={modalContent.title}
              onError={() => {
                console.error('Error cargando PDF:', modalContent.content);
              }}
            />
          </div>
        )}

        {/* CORREGIDO: Video con mejor manejo de errores y rutas */}
        {modalContent.content !== 'list' && modalContent.type === 'video' && (
          <div style={{ 
            padding: '20px', 
            height: 'calc(100vh - 56px)', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center',
            background: '#ffffff'
          }}>
            <video
              key={modalContent.content} // CAMBIO: Key para forzar re-render
              controls
              preload="metadata"
              onError={(e) => {
                console.error('Error cargando video:', modalContent.content);
                const target = e.target as HTMLVideoElement;
                const parent = target.parentElement;
                if (parent && !parent.querySelector('.error-message')) {
                  const errorDiv = document.createElement('div');
                  errorDiv.className = 'error-message';
                  errorDiv.innerHTML = `
                    <div style="text-align: center; padding: 40px; background: #f8f9fa; border-radius: 8px; border: 2px dashed #dee2e6; margin-top: 20px;">
                      <h3 style="color: #495057; margin-bottom: 16px;">Video no disponible</h3>
                      <p style="color: #6c757d; margin-bottom: 16px;">
                        El archivo de video no se pudo cargar.<br>
                        Archivo: ${modalContent.content}
                      </p>
                      <p style="color: #6c757d; font-size: 14px;">
                        Verifica que el archivo existe en: <code>public/help/</code>
                      </p>
                    </div>
                  `;
                  parent.appendChild(errorDiv);
                  target.style.display = 'none';
                }
              }}
              onLoadStart={() => {
                console.log('Iniciando carga del video:', modalContent.content);
              }}
              onCanPlay={() => {
                console.log('Video listo para reproducir:', modalContent.content);
              }}
              style={{
                width: '100%',
                maxWidth: '100%',
                height: 'auto',
                maxHeight: '70vh',
                borderRadius: '8px',
                backgroundColor: '#000000'
              }}
            >
              <source src={modalContent.content} type="video/mp4" />
              <div style={{
                textAlign: 'center', 
                padding: '40px', 
                background: '#f8f9fa', 
                borderRadius: '8px',
                border: '2px dashed #dee2e6',
                color: '#495057'
              }}>
                <h3 style={{ marginBottom: '16px' }}>Video no soportado</h3>
                <p style={{ marginBottom: '16px' }}>
                  Tu navegador no soporta la reproducción de este video.<br/>
                  Archivo: {modalContent.content}
                </p>
                <p style={{ fontSize: '14px', color: '#6c757d' }}>
                  Intenta usar un navegador más reciente o verifica que el archivo existe.
                </p>
              </div>
            </video>
            
            {/* Mensaje de ayuda adicional */}
            <div style={{
              marginTop: '20px',
              padding: '16px',
              background: '#e3f2fd',
              borderRadius: '8px',
              border: '1px solid #bbdefb',
              maxWidth: '600px',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0, color: '#1565c0', fontSize: '14px' }}>
              </p>
            </div>
          </div>
        )}
      </IonContent>
    </IonModal>
  );

  return (
    <IonApp>
      {/* CORREGIDO: Menú lateral mejorado */}
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
            {/* CAMBIO: Removido autoHide={false} y simplificado */}
            <IonMenuToggle>
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

            <IonMenuToggle>
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

            <IonMenuToggle>
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

            <IonMenuToggle>
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

            <IonMenuToggle>
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
                <IonCol size="12" size-md="8">
                  <div>
                    <h2 style={{ 
                      fontSize: '24px', 
                      fontWeight: 'bold', 
                      color: '#2c3e50', 
                      marginBottom: '8px' 
                    }}>
                      Ayuda y Soporte
                    </h2>
                    <p style={{ color: '#7f8c8d', marginBottom: '20px' }}>
                      Encuentra respuestas a tus preguntas y obtén el soporte que necesitas
                    </p>

                    {/* Categorías de ayuda */}
                    <div style={{ marginBottom: '32px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2c3e50', marginBottom: '16px' }}>
                        Categorías
                      </h3>
                      <IonGrid>
                        <IonRow>
                          {categoriesData.map((category) => (
                            <IonCol key={category.id} size="12" size-md="6">
                              <CategoryCard category={category} />
                            </IonCol>
                          ))}
                        </IonRow>
                      </IonGrid>
                    </div>

                    {/* Preguntas Frecuentes */}
                    <div>
                      <FAQCard />
                    </div>
                  </div>
                </IonCol>

                <IonCol size="12" size-md="4">
                  <div style={{ position: 'sticky', top: '20px' }}>
                    <QuickActionsCard />
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </IonContent>
      </IonPage>

      {/* Modal para mostrar contenido */}
      <ContentModal />
    </IonApp>
  );
};

export default AyudaEstudiante;