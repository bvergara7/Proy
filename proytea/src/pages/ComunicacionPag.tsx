import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  IonContent, IonPage, IonCard, IonCardContent, IonButton, IonTextarea, IonGrid, IonRow, IonCol,
  IonIcon, IonAlert, IonApp, IonMenu, IonHeader, IonToolbar, IonTitle, IonMenuButton, 
  IonMenuToggle, IonList, IonItem, IonLabel
} from '@ionic/react';
import { 
  schoolOutline, personOutline, refreshOutline, sendOutline, trashOutline, homeOutline,
  settingsOutline, libraryOutline, chatbubblesOutline, helpCircleOutline
} from 'ionicons/icons';

interface CommunicationState {
  needsHelp: boolean;
  dontUnderstand: boolean;
  finished: boolean;
  needsPause: boolean;
  repeatPlease: boolean;
  understood: boolean;
}

const ComunicacionPag: React.FC = () => {
  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState<string>('comunicacion');
  const [isNavigating, setIsNavigating] = useState(false);
  const [communicationState, setCommunicationState] = useState<CommunicationState>({
    needsHelp: false,
    dontUnderstand: false,
    finished: false,
    needsPause: false,
    repeatPlease: false,
    understood: false
  });
  
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  
  const studentData = {
    name: '',
    avatar: ''
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

  const handleCommunicationAction = (action: keyof CommunicationState, message: string) => {
    // Actualizar el estado de comunicación
    const newState = { ...communicationState };
    Object.keys(newState).forEach(key => {
      newState[key as keyof CommunicationState] = false;
    });
    newState[action] = true;
    setCommunicationState(newState);
    
    // Mostrar mensaje de confirmación
    setAlertMessage(message);
    setShowAlert(true);
    
    // Log para seguimiento
    console.log(`Acción de comunicación: ${action} - ${message}`);
  };

  const handleSendFeedback = () => {
    if (feedbackMessage.trim()) {
      setAlertMessage('Tu mensaje ha sido enviado correctamente');
      setShowAlert(true);
      console.log('Mensaje enviado:', feedbackMessage);
    } else {
      setAlertMessage('Por favor escribe un mensaje antes de enviar');
      setShowAlert(true);
    }
  };

  const handleClearFeedback = () => {
    setFeedbackMessage('');
    setAlertMessage('El mensaje ha sido borrado');
    setShowAlert(true);
  };

  const handleReproduceFeedback = () => {
    if (feedbackMessage.trim()) {
      setAlertMessage('Reproduciendo tu mensaje');
      setShowAlert(true);
      // Aquí se podría implementar síntesis de voz
      console.log('Reproducir:', feedbackMessage);
    } else {
      setAlertMessage('No hay mensaje para reproducir');
      setShowAlert(true);
    }
  };

  // Componente Header personalizado
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
          <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
            
            {/* Sección de Comunicación Rápida */}
            <IonCard style={{ 
              borderRadius: '12px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid rgba(116, 118, 126, 0.1)',
              marginBottom: '24px',
              background: '#f8f9fb'
            }}>
              <IonCardContent style={{ padding: '24px' }}>
                <h2 style={{ 
                  fontSize: '20px', 
                  fontWeight: 'bold', 
                  color: '#4a90c2', 
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  Comunicación Rápida
                </h2>
                
                <IonGrid>
                  <IonRow>
                    <IonCol size="12" sizeMd="4">
                      <IonButton 
                        expand="block"
                        size="large"
                        fill={communicationState.needsHelp ? "solid" : "outline"}
                        color={communicationState.needsHelp ? "primary" : "medium"}
                        onClick={() => handleCommunicationAction('needsHelp', 'Has indicado que necesitas ayuda. Un profesor te contactará pronto.')}
                        style={{ 
                          height: '80px',
                          fontSize: '16px',
                          fontWeight: '600',
                          margin: '8px 0',
                          textTransform: 'none',
                          borderRadius: '12px'
                        }}
                      >
                        NECESITO<br/>AYUDA
                      </IonButton>
                    </IonCol>
                    
                    <IonCol size="12" sizeMd="4">
                      <IonButton 
                        expand="block"
                        size="large"
                        fill={communicationState.dontUnderstand ? "solid" : "outline"}
                        color={communicationState.dontUnderstand ? "warning" : "medium"}
                        onClick={() => handleCommunicationAction('dontUnderstand', 'Has indicado que no entiendes. Te proporcionaremos más explicaciones.')}
                        style={{ 
                          height: '80px',
                          fontSize: '16px',
                          fontWeight: '600',
                          margin: '8px 0',
                          textTransform: 'none',
                          borderRadius: '12px'
                        }}
                      >
                        NO<br/>ENTIENDO
                      </IonButton>
                    </IonCol>
                    
                    <IonCol size="12" sizeMd="4">
                      <IonButton 
                        expand="block"
                        size="large"
                        fill={communicationState.finished ? "solid" : "outline"}
                        color={communicationState.finished ? "success" : "medium"}
                        onClick={() => handleCommunicationAction('finished', 'Perfecto! Has terminado la actividad correctamente.')}
                        style={{ 
                          height: '80px',
                          fontSize: '16px',
                          fontWeight: '600',
                          margin: '8px 0',
                          textTransform: 'none',
                          borderRadius: '12px'
                        }}
                      >
                        YA<br/>TERMINÉ
                      </IonButton>
                    </IonCol>
                  </IonRow>
                  
                  <IonRow>
                    <IonCol size="12" sizeMd="4">
                      <IonButton 
                        expand="block"
                        size="large"
                        fill={communicationState.needsPause ? "solid" : "outline"}
                        color={communicationState.needsPause ? "secondary" : "medium"}
                        onClick={() => handleCommunicationAction('needsPause', 'Tómate el tiempo que necesites. Puedes continuar cuando estés listo.')}
                        style={{ 
                          height: '80px',
                          fontSize: '16px',
                          fontWeight: '600',
                          margin: '8px 0',
                          textTransform: 'none',
                          borderRadius: '12px'
                        }}
                      >
                        NECESITO<br/>PAUSA
                      </IonButton>
                    </IonCol>
                    
                    <IonCol size="12" sizeMd="4">
                      <IonButton 
                        expand="block"
                        size="large"
                        fill={communicationState.repeatPlease ? "solid" : "outline"}
                        color={communicationState.repeatPlease ? "tertiary" : "medium"}
                        onClick={() => handleCommunicationAction('repeatPlease', 'Te repetiremos la información más lentamente.')}
                        style={{ 
                          height: '80px',
                          fontSize: '16px',
                          fontWeight: '600',
                          margin: '8px 0',
                          textTransform: 'none',
                          borderRadius: '12px'
                        }}
                      >
                        REPETIR<br/>POR FAVOR
                      </IonButton>
                    </IonCol>
                    
                    <IonCol size="12" sizeMd="4">
                      <IonButton 
                        expand="block"
                        size="large"
                        fill={communicationState.understood ? "solid" : "outline"}
                        color={communicationState.understood ? "success" : "medium"}
                        onClick={() => handleCommunicationAction('understood', 'Excelente! Puedes continuar con la siguiente actividad.')}
                        style={{ 
                          height: '80px',
                          fontSize: '16px',
                          fontWeight: '600',
                          margin: '8px 0',
                          textTransform: 'none',
                          borderRadius: '12px'
                        }}
                      >
                        ENTENDIDO
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>

            {/* Sección de Retroalimentación */}
            <IonCard style={{ 
              borderRadius: '12px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid rgba(116, 118, 126, 0.1)',
              background: '#f8f9fb'
            }}>
              <IonCardContent style={{ padding: '24px' }}>
                <h2 style={{ 
                  fontSize: '20px', 
                  fontWeight: 'bold', 
                  color: '#4a90c2', 
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  Retroalimentación
                </h2>
                
                <div style={{ marginBottom: '20px' }}>
                  <IonTextarea
                    value={feedbackMessage}
                    onIonInput={(e) => setFeedbackMessage(e.detail.value!)}
                    placeholder="Escribe aquí tu mensaje, pregunta o comentario..."
                    rows={6}
                    fill="outline"
                    style={{
                      '--border-radius': '12px',
                      '--border-color': '#d1d5db',
                      '--color': '#2c3e50',
                      fontSize: '16px',
                      fontFamily: 'Arial, sans-serif'
                    }}
                  />
                </div>
                
                <IonGrid>
                  <IonRow>
                    <IonCol size="12" sizeMd="4">
                      <IonButton
                        expand="block"
                        fill="outline"
                        color="primary"
                        onClick={handleReproduceFeedback}
                        style={{
                          height: '50px',
                          fontSize: '16px',
                          fontWeight: '600',
                          textTransform: 'none',
                          borderRadius: '12px',
                          margin: '4px 0'
                        }}
                      >
                        <IonIcon icon={refreshOutline} slot="start" />
                        REPRODUCIR
                      </IonButton>
                    </IonCol>
                    
                    <IonCol size="12" sizeMd="4">
                      <IonButton
                        expand="block"
                        color="primary"
                        onClick={handleSendFeedback}
                        style={{
                          height: '50px',
                          fontSize: '16px',
                          fontWeight: '600',
                          textTransform: 'none',
                          borderRadius: '12px',
                          margin: '4px 0'
                        }}
                      >
                        <IonIcon icon={sendOutline} slot="start" />
                        ENVIAR
                      </IonButton>
                    </IonCol>
                    
                    <IonCol size="12" sizeMd="4">
                      <IonButton
                        expand="block"
                        fill="outline"
                        color="medium"
                        onClick={handleClearFeedback}
                        style={{
                          height: '50px',
                          fontSize: '16px',
                          fontWeight: '600',
                          textTransform: 'none',
                          borderRadius: '12px',
                          margin: '4px 0'
                        }}
                      >
                        <IonIcon icon={trashOutline} slot="start" />
                        LIMPIAR
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>

            {/* Alert para mostrar mensajes de confirmación */}
            <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => setShowAlert(false)}
              header="Comunicación"
              message={alertMessage}
              buttons={[
                {
                  text: 'Entendido',
                  cssClass: 'alert-button-confirm'
                }
              ]}
              cssClass="custom-alert"
            />
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default ComunicacionPag;