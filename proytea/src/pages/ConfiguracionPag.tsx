import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonPage, IonApp, IonButton, IonCard, IonCardContent, IonCardTitle, IonItem, IonList, IonToggle, IonSelect, IonSelectOption, IonRange,
  IonGrid, IonRow, IonCol, IonInput, IonText, IonMenu, IonHeader, IonToolbar, IonTitle, IonMenuButton, IonButtons, IonMenuToggle, IonIcon, IonLabel } from '@ionic/react';
import { homeOutline, settingsOutline, libraryOutline, chatbubblesOutline, helpCircleOutline, schoolOutline, personOutline, eyeOutline, colorPaletteOutline, textOutline, volumeHighOutline, saveOutline, refreshOutline, checkmarkCircleOutline, menuOutline
} from 'ionicons/icons';

interface ConfigSettings {
  fontSize: number;
  fontFamily: string;
  colorTheme: string;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  highContrast: boolean;
  simplifiedInterface: boolean;
  autoSave: boolean;
  language: string;
  notificationsEnabled: boolean;
}

const ConfiguracionEstudiante: React.FC = () => {
  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState<string>('configuracion');
  const [isNavigating, setIsNavigating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string>('');
  
  // Estado de configuraciones con valores por defecto
  const [config, setConfig] = useState<ConfigSettings>({
    fontSize: 16,
    fontFamily: 'Arial',
    colorTheme: 'light',
    soundEnabled: false,
    animationsEnabled: true,
    highContrast: false,
    simplifiedInterface: true,
    autoSave: true,
    language: 'es',
    notificationsEnabled: true
  });

  // Cargar configuraciones guardadas al montar el componente
  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem('studentConfig') || '{}');
    setConfig(prev => ({ ...prev, ...savedConfig }));
  }, []);

  // FunciÃ³n para actualizar configuraciÃ³n
  const updateConfig = (key: keyof ConfigSettings, value: any) => {
    setConfig(prev => {
      const newConfig = { ...prev, [key]: value };
      // Guardar automÃ¡ticamente si estÃ¡ habilitado
      if (config.autoSave) {
        localStorage.setItem('studentConfig', JSON.stringify(newConfig));
      }
      return newConfig;
    });
  };

  // FunciÃ³n para guardar configuraciÃ³n manualmente
  const saveConfiguration = () => {
    localStorage.setItem('studentConfig', JSON.stringify(config));
    setSaveMessage('Configuración guardada correctamente');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  // FunciÃ³n para restaurar valores por defecto
  const resetToDefaults = () => {
    const defaultConfig: ConfigSettings = {
      fontSize: 16,
      fontFamily: 'Arial',
      colorTheme: 'light',
      soundEnabled: false,
      animationsEnabled: true,
      highContrast: false,
      simplifiedInterface: true,
      autoSave: true,
      language: 'es',
      notificationsEnabled: true
    };
    setConfig(defaultConfig);
    localStorage.setItem('studentConfig', JSON.stringify(defaultConfig));
    setSaveMessage('ConfiguraciÃ³n restaurada a valores por defecto');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  // Obtener estilos segÃºn la configuraciÃ³n actual
  const getPreviewStyles = () => {
    let backgroundColor, textColor, borderColor;
    
    switch(config.colorTheme) {
      case 'dark':
        backgroundColor = '#2c3e50';
        textColor = '#ffffff';
        borderColor = config.highContrast ? '#ffffff' : 'rgba(255, 255, 255, 0.2)';
        break;
      case 'blue':
        backgroundColor = '#e3f2fd';
        textColor = '#1565c0';
        borderColor = config.highContrast ? '#1565c0' : 'rgba(21, 101, 192, 0.2)';
        break;
      default: // light
        backgroundColor = '#ffffff';
        textColor = '#2c3e50';
        borderColor = config.highContrast ? '#2c3e50' : 'rgba(116, 118, 126, 0.2)';
    }

    return {
      fontSize: `${config.fontSize}px`,
      fontFamily: config.fontFamily,
      backgroundColor: backgroundColor,
      color: textColor,
      filter: config.highContrast ? 'contrast(150%)' : 'none',
      border: `2px solid ${borderColor}`
    };
  };

  // Obtener estilos para el Ã¡rea de ejemplo dentro del preview
  const getPreviewExampleAreaStyles = () => {
    let backgroundColor;
    
    switch(config.colorTheme) {
      case 'dark':
        backgroundColor = '#34495e';
        break;
      case 'blue':
        backgroundColor = '#bbdefb';
        break;
      default: // light
        backgroundColor = '#f8f9fa';
    }

    return {
      backgroundColor: backgroundColor
    };
  };

  // FunciÃ³n para navegar a diferentes secciones
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

  return (
    <IonApp>
      {/* Estilos CSS globales */}
      <style>{`
        /* Estilos para IonSelect */
        ion-select {
          --color: #2c3e50 !important;
          --placeholder-color: #6c757d !important;
        }
        
        .select-interface-option {
          color: #2c3e50 !important;
        }
        
        .select-popover .popover-content {
          --color: #2c3e50 !important;
          --background: #ffffff !important;
          background-color: #ffffff !important;
        }
        
        .select-popover ion-radio {
          --color: #2c3e50 !important;
          --color-checked: #4a90c2 !important;
        }
        
        .select-popover ion-label {
          color: #2c3e50 !important;
        }
        
        .select-popover ion-item {
          --color: #2c3e50 !important;
          --background: #ffffff !important;
          background-color: #ffffff !important;
        }
        
        .alert-wrapper {
          --background: #ffffff !important;
          background-color: #ffffff !important;
        }
        
        .alert-wrapper .alert-radio-label {
          color: #2c3e50 !important;
        }
        
        .alert-wrapper .alert-radio-button {
          color: #2c3e50 !important;
        }
        
        .alert-wrapper .alert-button {
          color: #4a90c2 !important;
        }
        
        .alert-wrapper .alert-title {
          color: #2c3e50 !important;
        }
        
        .alert-wrapper .alert-message {
          color: #2c3e50 !important;
        }
        
        .popover-content {
          --background: #ffffff !important;
          background-color: #ffffff !important;
        }
        
        .popover-content ion-list {
          background-color: #ffffff !important;
        }
        
        .popover-content ion-item {
          --background: #ffffff !important;
          --color: #2c3e50 !important;
          background-color: #ffffff !important;
          color: #2c3e50 !important;
        }
        
        ion-item {
          --color: #2c3e50 !important;
        }
        
        ion-select .select-text {
          color: #2c3e50 !important;
        }
        
        ion-action-sheet {
          --background: #ffffff !important;
        }
        
        ion-action-sheet .action-sheet-button {
          color: #2c3e50 !important;
        }
        
        ion-action-sheet .action-sheet-title {
          color: #2c3e50 !important;
        }
      `}</style>

      {/* MenÃº lateral tipo hamburguesa */}
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

      {/* Contenido Principal */}
      <IonPage id="main-content">
        {/* Header con botÃ³n hamburguesa */}
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
                <IonTitle style={{ fontSize: '18px', fontWeight: 'bold' }}>
                </IonTitle>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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

        <IonContent style={{ '--background': '#ffffff' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <IonGrid>
              <IonRow>
                {/* Columna izquierda - Configuraciones */}
                <IonCol size="12" sizeMd="8">
                  <h2 style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    color: '#2c3e50', 
                    marginBottom: '20px' 
                  }}>
                    Configuración Personal
                  </h2>

                  {/* Mensaje de guardado */}
                  {saveMessage && (
                    <IonCard style={{ 
                      backgroundColor: '#d4edda', 
                      borderColor: '#c3e6cb',
                      marginBottom: '20px' 
                    }}>
                      <IonCardContent>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <IonIcon icon={checkmarkCircleOutline} style={{ color: '#28a745' }} />
                          <span style={{ color: '#155724' }}>{saveMessage}</span>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  )}

                  {/* ConfiguraciÃ³n Visual */}
                  <IonCard style={{ 
                    borderRadius: '12px', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    marginBottom: '20px',
                    backgroundColor: '#ffffff'
                  }}>
                    <IonCardContent style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <IonIcon 
                          icon={eyeOutline} 
                          style={{ fontSize: '24px', color: '#4a90c2' }} 
                        />
                        <IonCardTitle style={{ fontSize: '18px', color: '#2c3e50' }}>
                          Configuración Visual
                        </IonCardTitle>
                      </div>

                      <IonList style={{ background: 'transparent' }}>
                        {/* TamaÃ±o de fuente */}
                        <IonItem style={{ '--background': 'transparent', marginBottom: '16px' }}>
                          <div style={{ width: '100%' }}>
                            <IonText style={{ fontSize: '16px', fontWeight: '500', color: '#2c3e50' }}>
                              Tamaño de Texto: {config.fontSize}px
                            </IonText>
                            <IonRange
                              min={12}
                              max={24}
                              step={2}
                              value={config.fontSize}
                              onIonInput={(e) => updateConfig('fontSize', e.detail.value)}
                              style={{ marginTop: '8px' }}
                            >
                              <div slot="start" style={{ fontSize: '12px', color: '#2c3e50' }}>A</div>
                              <div slot="end" style={{ fontSize: '20px', color: '#2c3e50' }}>A</div>
                            </IonRange>
                          </div>
                        </IonItem>

                        {/* Familia de fuente */}
                        <IonItem style={{ '--background': 'transparent', marginBottom: '16px', '--color': '#2c3e50' }}>
                          <IonText slot="start" style={{ fontSize: '16px', fontWeight: '500', color: '#2c3e50' }}>
                            Tipo de Letra:
                          </IonText>
                          <IonSelect
                            value={config.fontFamily}
                            placeholder="Seleccionar fuente"
                            onIonChange={(e) => updateConfig('fontFamily', e.detail.value)}
                            style={{ '--color': '#2c3e50', '--placeholder-color': '#6c757d' }}
                          >
                            <IonSelectOption value="Arial">Arial</IonSelectOption>
                            <IonSelectOption value="Helvetica">Helvetica</IonSelectOption>
                            <IonSelectOption value="Verdana">Verdana</IonSelectOption>
                            <IonSelectOption value="Tahoma">Tahoma</IonSelectOption>
                            <IonSelectOption value="'Open Sans', sans-serif">Sans-Serif (Recomendado)</IonSelectOption>
                          </IonSelect>
                        </IonItem>

                        {/* Tema de colores */}
                        <IonItem style={{ '--background': 'transparent', marginBottom: '16px', '--color': '#2c3e50' }}>
                          <IonText slot="start" style={{ fontSize: '16px', fontWeight: '500', color: '#2c3e50' }}>
                            Tema de Colores:
                          </IonText>
                          <IonSelect
                            value={config.colorTheme}
                            placeholder="Seleccionar tema"
                            onIonChange={(e) => updateConfig('colorTheme', e.detail.value)}
                            style={{ '--color': '#2c3e50', '--placeholder-color': '#6c757d' }}
                          >
                            <IonSelectOption value="light">Claro (Recomendado)</IonSelectOption>
                            <IonSelectOption value="dark">Oscuro</IonSelectOption>
                            <IonSelectOption value="blue">Azul Suave</IonSelectOption>
                          </IonSelect>
                        </IonItem>

                        {/* Alto contraste */}
                        <IonItem style={{ '--background': 'transparent', marginBottom: '16px' }}>
                          <IonText style={{ fontSize: '16px', fontWeight: '500', color: '#2c3e50' }}>
                            Alto Contraste
                          </IonText>
                          <IonToggle
                            slot="end"
                            checked={config.highContrast}
                            onIonChange={(e) => updateConfig('highContrast', e.detail.checked)}
                          />
                        </IonItem>
                      </IonList>
                    </IonCardContent>
                  </IonCard>

                  {/* ConfiguraciÃ³n de Interfaz */}
                  <IonCard style={{ 
                    borderRadius: '12px', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    marginBottom: '20px',
                    backgroundColor: '#ffffff'
                  }}>
                    <IonCardContent style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <IonIcon 
                          icon={settingsOutline} 
                          style={{ fontSize: '24px', color: '#4a90c2' }} 
                        />
                        <IonCardTitle style={{ fontSize: '18px', color: '#2c3e50' }}>
                          Configuración de Interfaz
                        </IonCardTitle>
                      </div>

                      <IonList style={{ background: 'transparent' }}>
                        {/* Interfaz simplificada */}
                        <IonItem style={{ '--background': 'transparent', marginBottom: '16px' }}>
                          <IonText style={{ fontSize: '16px', fontWeight: '500', color: '#2c3e50' }}>
                            Interfaz Simplificada
                          </IonText>
                          <IonToggle
                            slot="end"
                            checked={config.simplifiedInterface}
                            onIonChange={(e) => updateConfig('simplifiedInterface', e.detail.checked)}
                          />
                        </IonItem>

                        {/* Animaciones */}
                        <IonItem style={{ '--background': 'transparent', marginBottom: '16px' }}>
                          <IonText style={{ fontSize: '16px', fontWeight: '500', color: '#2c3e50' }}>
                            Animaciones Suaves
                          </IonText>
                          <IonToggle
                            slot="end"
                            checked={config.animationsEnabled}
                            onIonChange={(e) => updateConfig('animationsEnabled', e.detail.checked)}
                          />
                        </IonItem>

                        {/* Sonidos */}
                        <IonItem style={{ '--background': 'transparent', marginBottom: '16px' }}>
                          <IonText style={{ fontSize: '16px', fontWeight: '500', color: '#2c3e50' }}>
                            Sonidos del Sistema
                          </IonText>
                          <IonToggle
                            slot="end"
                            checked={config.soundEnabled}
                            onIonChange={(e) => updateConfig('soundEnabled', e.detail.checked)}
                          />
                        </IonItem>

                        {/* Guardado automÃ¡tico */}
                        <IonItem style={{ '--background': 'transparent', marginBottom: '16px' }}>
                          <IonText style={{ fontSize: '16px', fontWeight: '500', color: '#2c3e50' }}>
                            Guardado Automático
                          </IonText>
                          <IonToggle
                            slot="end"
                            checked={config.autoSave}
                            onIonChange={(e) => updateConfig('autoSave', e.detail.checked)}
                          />
                        </IonItem>

                        {/* Notificaciones */}
                        <IonItem style={{ '--background': 'transparent' }}>
                          <IonText style={{ fontSize: '16px', fontWeight: '500', color: '#2c3e50' }}>
                            Notificaciones Importantes
                          </IonText>
                          <IonToggle
                            slot="end"
                            checked={config.notificationsEnabled}
                            onIonChange={(e) => updateConfig('notificationsEnabled', e.detail.checked)}
                          />
                        </IonItem>
                      </IonList>
                    </IonCardContent>
                  </IonCard>

                  {/* Botones de acciÃ³n */}
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <IonButton
                      expand="block"
                      style={{
                        '--background': '#4a90c2',
                        '--color': 'white',
                        flex: '1',
                        minWidth: '200px',
                        height: '48px',
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }}
                      onClick={saveConfiguration}
                    >
                      <IonIcon icon={saveOutline} slot="start" />
                      GUARDAR CONFIGURACIÓN
                    </IonButton>

                    <IonButton
                      expand="block"
                      fill="outline"
                      style={{
                        '--border-color': '#6c757d',
                        '--color': '#6c757d',
                        flex: '1',
                        minWidth: '200px',
                        height: '48px',
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }}
                      onClick={resetToDefaults}
                    >
                      <IonIcon icon={refreshOutline} slot="start" />
                      RESTAURAR VALORES
                    </IonButton>
                  </div>
                </IonCol>

                {/* Columna derecha - Vista previa */}
                <IonCol size="12" sizeMd="4">
                  <div style={{ position: 'sticky', top: '20px' }}>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: 'bold', 
                      color: '#2c3e50', 
                      marginBottom: '16px',
                      textAlign: 'center'
                    }}>
                      VISTA PREVIA CONFIGURACIÓN
                    </h3>
                    
                    <IonCard style={{ 
                      ...getPreviewStyles(),
                      borderRadius: '12px',
                      padding: '20px',
                      minHeight: '200px'
                    }}>
                      <IonCardContent>
                        <h4 style={{ 
                          fontSize: `${config.fontSize + 2}px`,
                          fontFamily: config.fontFamily,
                          margin: '0 0 12px 0'
                        }}>
                          Ejemplo de Texto
                        </h4>
                        <p style={{
                          fontSize: `${config.fontSize}px`,
                          fontFamily: config.fontFamily,
                          lineHeight: '1.5',
                          margin: '0'
                        }}>
                          Este es un ejemplo de cómo se verá el texto con tu configuración actual. El tamaño, la fuente y los colores se aplicarán a toda la aplicación.
                        </p>
                        
                        <div style={{
                          marginTop: '16px',
                          padding: '12px',
                          ...getPreviewExampleAreaStyles(),
                          borderRadius: '8px'
                        }}>
                          <small style={{
                            fontSize: `${config.fontSize - 2}px`,
                            fontFamily: config.fontFamily
                          }}>
                            Configuración aplicada correctamente
                          </small>
                        </div>
                      </IonCardContent>
                    </IonCard>

                    {config.notificationsEnabled && (
                      <IonCard style={{ 
                        borderRadius: '12px',
                        backgroundColor: '#e3f2fd',
                        border: '1px solid #bbdefb'
                      }}>
                        <IonCardContent style={{ padding: '16px' }}>
                          <h4 style={{ 
                            fontSize: '16px',
                            color: '#1565c0',
                            margin: '0 0 8px 0'
                          }}>
                           Consejos
                          </h4>
                          <ul style={{ 
                            fontSize: '14px',
                            color: '#1976d2',
                            margin: 0,
                            paddingLeft: '16px'
                          }}>
                            <li>Usa texto grande para mejor legibilidad</li>
                            <li>Interfaz simplificada reduce distracciones</li>
                            <li>Desactiva sonidos si generan molestia</li>
                            <li>El guardado automático protege tus preferencias</li>
                          </ul>
                        </IonCardContent>
                      </IonCard>
                    )}
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

export default ConfiguracionEstudiante;