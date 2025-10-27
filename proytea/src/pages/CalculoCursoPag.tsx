import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonApp, IonTabs, IonTab, IonPage, IonContent, IonGrid, IonRow, IonCol,
  IonButton, IonIcon, IonProgressBar, IonCard, IonCardContent, IonModal,
  IonHeader, IonToolbar, IonTitle, IonButtons, IonItem, IonLabel,
  IonSelect, IonSelectOption, IonToggle, IonTabBar, IonTabButton, IonToast,
  IonRange
} from '@ionic/react';
import {
  arrowBackOutline, calculatorOutline, settingsOutline, personOutline,
  volumeHighOutline, pauseOutline, documentTextOutline, videocamOutline,
  refreshOutline, expandOutline, chevronForwardOutline, helpOutline,
  closeOutline, homeOutline, libraryOutline, chatbubblesOutline,   
  helpCircleOutline, playOutline
} from 'ionicons/icons';

interface CourseSettings {
  fontSize: number;
  audioSpeed: number;
  darkMode: boolean;
  autoPlay: boolean;
}

interface LessonContent {
  id: string;
  title: string;
  type: 'text' | 'audio' | 'video';
  content: string;
  completed: boolean;
  images?: string[];
  videoSrc?: string;
  audioSrc?: string;
}

const CalculoCursoPag: React.FC = () => {
    const history = useHistory();
    const [selectedTab, setSelectedTab] = useState<string>('cursos');
    const [currentLesson, setCurrentLesson] = useState<string>('1');
    const [showSettings, setShowSettings] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [activeContentType, setActiveContentType] = useState<'text' | 'audio' | 'video'>('text');
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [currentAudioTime, setCurrentAudioTime] = useState(0);
    const [audioDuration, setAudioDuration] = useState(0);
    const [isNavigating, setIsNavigating] = useState(false);
    
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    
    const [courseSettings, setCourseSettings] = useState<CourseSettings>({
      fontSize: 16,
      audioSpeed: 1,
      darkMode: false,
      autoPlay: false
    });

    const [courseData] = useState({
      id: '3',
      name: 'Cálculo Diferencial e Integral',
      code: 'MAT1002',
      progress: 35,
      instructor: '',
      totalLessons: 20,
      completedLessons: 7,
      currentLesson: 'Límites y Continuidad'
    });

    // URLs de audio de ejemplo (usando text-to-speech online o puedes reemplazar con tus propios audios)
    const [lessonsData] = useState<LessonContent[]>([
      {
        id: '1',
        title: 'Límites: Concepto Fundamentales',
        type: 'text',
        content: 'Los límites nos permiten entender el comportamiento de una función cuando se acerca a un punto específico. Es la base para comprender la continuidad y las derivadas.',
        completed: true,
        images: [
          'https://blog.nekomath.com/wp-content/uploads/2023/10/T5_E2_Definicion-formal-de-limite-de-una-funcion-1.png',
          'https://i.ytimg.com/vi/T4DzFv2stlI/maxresdefault.jpg'
        ],
        videoSrc: '/src/video/CalcLeccion1.mp4',
        audioSrc: '/src/audio/CalcAudio1.mp3'
      },
      {
        id: '2',
        title: 'Derivadas y sus aplicaciones',
        type: 'text',
        content: 'Las derivadas son una de las herramientas fundamentales del cálculo, pues permiten medir la tasa de cambio de una función en un punto específico. En términos sencillos, la derivada indica qué tan rápido cambia una magnitud respecto a otra, lo que se puede interpretar como la pendiente de la recta tangente a la curva en un punto.',
        completed: true,
        images: [
          'https://www.clarin.com/img/2023/06/26/fMoVwVoZh_2000x1500__1.jpg',
          'https://i.ytimg.com/vi/owK4BueUShA/maxresdefault.jpg'
        ],
        videoSrc: '/src/video/CalcLeccion2.mp4',
        audioSrc: '/src/audio/CalcAudio2.mp3'
      },
      {
        id: '3',
        title: 'Integrales y su importancia en el Calculo',
        type: 'text',
        content: 'La integral es un concepto del cálculo que representa la suma continua o acumulación de cantidades infinitesimales. Puede entenderse como el área bajo una curva en un intervalo dado, aunque también abarca aplicaciones más generales.',
        completed: false,
        images: [
          'https://www.matesfacil.com/primitivas/ReAr6-1.jpg',
          'https://cursoparalaunam.com/wp-content/uploads/2022/01/PROPIEDADES-DE-LA-INTEGRAL-DEFINIDA.jpg'
        ],
        videoSrc: '/src/video/CalcLeccion3.mp4',
        audioSrc: '/src/audio/CalcAudio3.mp3'
      }
    ]);

    // Efecto para aplicar la velocidad del audio cuando cambia
    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.playbackRate = courseSettings.audioSpeed;
      }
    }, [courseSettings.audioSpeed]);

    // Efecto para limpiar el audio al desmontar
    useEffect(() => {
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      };
    }, []);

    const getCurrentLesson = (): LessonContent => {
      return lessonsData.find(lesson => lesson.id === currentLesson) || lessonsData[0];
    };

    const handleImageClick = (imageUrl: string) => {
      setSelectedImage(imageUrl);
      setShowImageModal(true);
    };
    
    const handleVideoPlayPause = () => {
      if (videoRef.current) {
        if (videoRef.current.paused) {
          videoRef.current.play();
          setIsVideoPlaying(true);
        } else {
          videoRef.current.pause();
          setIsVideoPlaying(false);
        }
      }
    };

    const handleAudioPlayPause = () => {
      if (audioRef.current) {
        if (audioRef.current.paused) {
          audioRef.current.play()
            .then(() => {
              setIsAudioPlaying(true);
              setToastMessage('Reproduciendo audio');
              setShowToast(true);
            })
            .catch((error) => {
              console.error('Error al reproducir audio:', error);
              setToastMessage('Error al reproducir audio');
              setShowToast(true);
            });
        } else {
          audioRef.current.pause();
          setIsAudioPlaying(false);
        }
      }
    };

    const handleAudioTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentAudioTime(audioRef.current.currentTime);
      }
    };

    const handleAudioLoaded = () => {
      if (audioRef.current) {
        setAudioDuration(audioRef.current.duration);
      }
    };

    const handleAudioSeek = (e: CustomEvent) => {
      const newTime = e.detail.value;
      if (audioRef.current) {
        audioRef.current.currentTime = newTime;
        setCurrentAudioTime(newTime);
      }
    };

    const formatTime = (seconds: number): string => {
      if (isNaN(seconds) || !isFinite(seconds)) {
        return '0:00';
      }
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleNextLesson = () => {
      const currentIndex = lessonsData.findIndex(lesson => lesson.id === currentLesson);
      if (currentIndex < lessonsData.length - 1) {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
        }
        setIsAudioPlaying(false);
        setIsVideoPlaying(false);
        setCurrentAudioTime(0);
        
        setCurrentLesson(lessonsData[currentIndex + 1].id);
        setToastMessage('Avanzando a la siguiente lección');
        setShowToast(true);
      } else {
        setToastMessage('Has completado todas las lecciones disponibles');
        setShowToast(true);
      }
    };

    const handlePreviousLesson = () => {
      const currentIndex = lessonsData.findIndex(lesson => lesson.id === currentLesson);
      if (currentIndex > 0) {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
        }
        setIsAudioPlaying(false);
        setIsVideoPlaying(false);
        setCurrentAudioTime(0);
        
        setCurrentLesson(lessonsData[currentIndex - 1].id);
        setToastMessage('Regresando a la lección anterior');
        setShowToast(true);
      }
    };

    const handleContentTypeChange = (type: 'text' | 'audio' | 'video') => {
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      setIsAudioPlaying(false);
      setIsVideoPlaying(false);
      
      setActiveContentType(type);
      setToastMessage(`Cambiando a modo ${type === 'text' ? 'texto' : type === 'audio' ? 'audio' : 'video'}`);
      setShowToast(true);
    };

    const handleRequestHelp = () => {
      setToastMessage('Función de ayuda - Redirigiendo...');
      setShowToast(true);
      setTimeout(() => {
        // history.push('/Ayuda');
      }, 1000);
    };

    const CustomHeader: React.FC = () => (
      <div style={{ 
        padding: '16px',
        background: 'linear-gradient(135deg, #7db8a8 0%, #4a90c2 100%)',
        color: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <IonButton
  fill="clear"
  onClick={() => {
    history.push('/Cursos');
  }}
  style={{ '--color': 'white', minWidth: 'auto', margin: '0' }}
>
  <IonIcon icon={arrowBackOutline} style={{ fontSize: '24px' }} />
</IonButton>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <IonIcon icon={calculatorOutline} style={{ fontSize: '24px' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{courseData.name}</h1>
              <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>{courseData.code}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <IonButton
              fill="clear"
              onClick={() => setShowSettings(true)}
              style={{ '--color': 'white', minWidth: 'auto' }}
            >
              <IonIcon icon={settingsOutline} style={{ fontSize: '20px' }} />
            </IonButton>
            <div style={{
              width: '36px',
              height: '36px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <IonIcon icon={personOutline} style={{ fontSize: '20px' }} />
            </div>
          </div>
        </div>
      </div>
    );

    const ProgressSection: React.FC = () => (
      <div style={{ 
        background: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid rgba(116, 118, 126, 0.1)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '12px' 
        }}>
          <h3 style={{ 
            fontSize: `${courseSettings.fontSize + 2}px`, 
            fontWeight: 'bold', 
            color: '#2c3e50', 
            margin: 0 
          }}>
            Progreso del Curso
          </h3>
          <span style={{ 
            fontSize: `${courseSettings.fontSize}px`, 
            color: '#7f8c8d' 
          }}>
            {courseData.progress}% ({courseData.completedLessons}/{courseData.totalLessons})
          </span>
        </div>
        <IonProgressBar 
          value={courseData.progress / 100} 
          style={{
            height: '12px',
            borderRadius: '6px',
            '--progress-background': 'linear-gradient(90deg, #7db8a8 0%, #4a90c2 100%)'
          }}
        />
        <p style={{ 
          fontSize: `${courseSettings.fontSize - 2}px`, 
          color: '#7f8c8d', 
          marginTop: '8px',
          marginBottom: 0
        }}>
          Lección actual: {courseData.currentLesson}
        </p>
      </div>
    );

    const ContentArea: React.FC = () => {
      const lesson = getCurrentLesson();
      
      return (
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid rgba(116, 118, 126, 0.1)',
          minHeight: '400px'
        }}>
          <h2 style={{ 
            fontSize: `${courseSettings.fontSize + 4}px`, 
            fontWeight: 'bold', 
            color: '#2c3e50', 
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {lesson.title}
          </h2>
          
          <div style={{
            border: '2px dashed #e3e6ea',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {activeContentType === 'text' && (
              <div style={{ width: '100%' }}>
                <div style={{
                  textAlign: 'left',
                  fontSize: `${courseSettings.fontSize}px`,
                  lineHeight: '1.6',
                  color: '#2c3e50',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {lesson.content}
                </div>
              </div>
            )}
            
            {activeContentType === 'audio' && (
              <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
                <audio
                  ref={audioRef}
                  src={lesson.audioSrc}
                  onTimeUpdate={handleAudioTimeUpdate}
                  onLoadedMetadata={handleAudioLoaded}
                  onPlay={() => setIsAudioPlaying(true)}
                  onPause={() => setIsAudioPlaying(false)}
                  onEnded={() => {
                    setIsAudioPlaying(false);
                    setToastMessage('Audio finalizado');
                    setShowToast(true);
                  }}
                  preload="metadata"
                  style={{ display: 'none' }}
                />

                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #7db8a8 0%, #4a90c2 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: 'white',
                  fontSize: '32px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }} 
                onClick={handleAudioPlayPause}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                >
                  <IonIcon icon={isAudioPlaying ? pauseOutline : volumeHighOutline} />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '14px', 
                    color: '#7f8c8d',
                    marginBottom: '8px'
                  }}>
                    <span>{formatTime(currentAudioTime)}</span>
                    <span>{formatTime(audioDuration)}</span>
                  </div>
                  
                  <IonRange
                    value={currentAudioTime}
                    min={0}
                    max={audioDuration || 100}
                    onIonChange={handleAudioSeek}
                    style={{
                      '--bar-background': '#e3e6ea',
                      '--bar-background-active': '#7db8a8',
                      '--knob-background': '#4a90c2',
                      '--knob-box-shadow': '0 2px 6px rgba(0,0,0,0.2)'
                    }}
                  />
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  <IonButton
                    onClick={handleAudioPlayPause}
                    style={{
                      '--background': '#7db8a8',
                      '--border-radius': '8px',
                      minWidth: '120px',
                      height: '44px',
                      fontWeight: 'bold'
                    }}
                  >
                    <IonIcon icon={isAudioPlaying ? pauseOutline : playOutline} slot="start" />
                    {isAudioPlaying ? 'PAUSAR' : 'REPRODUCIR'}
                  </IonButton>
                  <IonButton
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.currentTime = 0;
                        setCurrentAudioTime(0);
                        audioRef.current.play()
                          .then(() => {
                            setIsAudioPlaying(true);
                          })
                          .catch(err => console.error('Error:', err));
                      }
                    }}
                    style={{
                      '--background': '#4a90c2',
                      '--border-radius': '8px',
                      minWidth: '120px',
                      height: '44px',
                      fontWeight: 'bold'
                    }}
                  >
                    <IonIcon icon={refreshOutline} slot="start" />
                    REINICIAR
                  </IonButton>
                </div>
                
                <div style={{
                  background: '#f8f9fb',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: `${courseSettings.fontSize - 2}px`,
                  color: '#5a6c7d',
                  textAlign: 'left',
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  <strong></strong><br/><br/>
                  {lesson.content}
                </div>
              </div>
            )}
            
            {activeContentType === 'video' && (
              <div style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}>
                {lesson.videoSrc ? (
                  <>
                    <video
                      ref={videoRef}
                      style={{
                        width: '100%',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        marginBottom: '16px'
                      }}
                      controls
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                      onEnded={() => setIsVideoPlaying(false)}
                    >
                      <source src={lesson.videoSrc} type="video/mp4" />
                      Tu navegador no soporta el elemento de video.
                    </video>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '12px',
                      marginTop: '16px'
                    }}>
                      <IonButton
                        onClick={handleVideoPlayPause}
                        style={{
                          '--background': '#7db8a8',
                          '--border-radius': '8px',
                          minWidth: '120px',
                          height: '44px',
                          fontWeight: 'bold'
                        }}
                      >
                        <IonIcon icon={isVideoPlaying ? pauseOutline : playOutline} slot="start" />
                        {isVideoPlaying ? 'PAUSAR' : 'REPRODUCIR'}
                      </IonButton>
                      <IonButton
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.currentTime = 0;
                            videoRef.current.play();
                          }
                        }}
                        style={{
                          '--background': '#4a90c2',
                          '--border-radius': '8px',
                          minWidth: '120px',
                          height: '44px',
                          fontWeight: 'bold'
                        }}
                      >
                        <IonIcon icon={refreshOutline} slot="start" />
                        REINICIAR
                      </IonButton>
                    </div>
                  </>
                ) : (
                  <div style={{
                    padding: '40px',
                    background: '#f8f9fb',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: '#e3e6ea',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      color: '#7f8c8d',
                      fontSize: '24px'
                    }}>
                      <IonIcon icon={videocamOutline} />
                    </div>
                    <p style={{ 
                      fontSize: `${courseSettings.fontSize}px`, 
                      color: '#7f8c8d',
                      margin: 0
                    }}>
                      Video no disponible para esta lección
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    };

    const InstructionsArea: React.FC = () => (
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid rgba(116, 118, 126, 0.1)'
      }}>
        <h4 style={{ 
          fontSize: `${courseSettings.fontSize}px`, 
          fontWeight: 'bold', 
          color: '#2c3e50', 
          marginBottom: '12px',
          textAlign: 'center'
        }}>
          INSTRUCCIONES
        </h4>
        <div style={{ 
          fontSize: `${courseSettings.fontSize - 2}px`, 
          color: '#5a6c7d',
          lineHeight: '1.5',
          textAlign: 'center'
        }}>
          <p>1. Lee el contenido matemático con atención</p>
          <p>2. Utiliza los controles de audio o video si lo prefieres</p>
          <p>3. Haz clic en las gráficas para verlas en detalle</p>
          <p>4. Avanza al siguiente concepto cuando estés listo</p>
          <p>5. Solicita ayuda si necesitas apoyo adicional</p>
        </div>
      </div>
    );

    const ControlButtons: React.FC = () => (
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <IonButton
          fill={activeContentType === 'audio' ? 'solid' : 'outline'}
          onClick={() => handleContentTypeChange('audio')}
          style={{
            '--border-color': '#7db8a8',
            '--color': activeContentType === 'audio' ? 'white' : '#7db8a8',
            '--background': activeContentType === 'audio' ? '#7db8a8' : 'transparent',
            '--border-radius': '8px',
            minWidth: '100px',
            height: '44px',
            fontWeight: 'bold'
          }}
        >
          <IonIcon icon={volumeHighOutline} slot="start" />
          AUDIO
        </IonButton>
        
        <IonButton
          fill={activeContentType === 'text' ? 'solid' : 'outline'}
          onClick={() => handleContentTypeChange('text')}
          style={{
            '--border-color': '#4a90c2',
            '--color': activeContentType === 'text' ? 'white' : '#4a90c2',
            '--background': activeContentType === 'text' ? '#4a90c2' : 'transparent',
            '--border-radius': '8px',
            minWidth: '100px',
            height: '44px',
            fontWeight: 'bold'
          }}
        >
          <IonIcon icon={documentTextOutline} slot="start" />
          TEXTO
        </IonButton>
        
        <IonButton
          fill={activeContentType === 'video' ? 'solid' : 'outline'}
          onClick={() => handleContentTypeChange('video')}
          style={{
            '--border-color': '#7db8a8',
            '--color': activeContentType === 'video' ? 'white' : '#7db8a8',
            '--background': activeContentType === 'video' ? '#7db8a8' : 'transparent',
            '--border-radius': '8px',
            minWidth: '100px',
            height: '44px',
            fontWeight: 'bold'
          }}
        >
          <IonIcon icon={videocamOutline} slot="start" />
          VIDEO
        </IonButton>
      </div>
    );

    const SidePanel: React.FC = () => {
      const lesson = getCurrentLesson();
      
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {lesson.images && lesson.images.map((imageUrl, index) => (
            <div key={index} style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid rgba(116, 118, 126, 0.1)',
              textAlign: 'center'
            }}>
              <h5 style={{
                fontSize: `${courseSettings.fontSize - 1}px`,
                color: '#2c3e50',
                marginBottom: '12px',
                fontWeight: 'bold'
              }}>
                Gráfica Matemática {index + 1}
              </h5>
              <div 
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease'
                }}
                onClick={() => handleImageClick(imageUrl)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <img 
                  src={imageUrl}
                  alt={`Gráfica matemática ${index + 1} de ${lesson.title}`}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = `
                      <div style="
                        width: 100%; 
                        height: 150px; 
                        background: #f8f9fb; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        border: 2px dashed #e3e6ea;
                        border-radius: 8px;
                        color: #7f8c8d;
                        font-size: 14px;
                      ">
                        Gráfica no disponible
                      </div>
                    `;
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'rgba(0,0,0,0.6)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <IonIcon icon={expandOutline} style={{ fontSize: '16px' }} />
                </div>
              </div>
              <p style={{
                fontSize: `${courseSettings.fontSize - 3}px`,
                color: '#7f8c8d',
                marginTop: '8px',
                marginBottom: 0
              }}>
                Haz clic para ampliar
              </p>
            </div>
          ))}

          <IonButton
            expand="block"
            onClick={handleNextLesson}
            style={{
              '--background': 'linear-gradient(135deg, #4a90c2 0%, #7db8a8 100%)',
              '--border-radius': '8px',
              '--box-shadow': '0 2px 8px rgba(0,0,0,0.2)',
              height: '50px',
              fontWeight: 'bold',
              fontSize: `${courseSettings.fontSize}px`
            }}
          >
            <IonIcon icon={chevronForwardOutline} slot="start" />
            SIGUIENTE CONTENIDO
          </IonButton>

          <IonButton
            expand="block"
            fill="outline"
            onClick={handleRequestHelp}
            style={{
              '--border-color': '#95a5a6',
              '--color': '#95a5a6',
              '--border-radius': '8px',
              height: '50px',
              fontWeight: 'bold',
              fontSize: `${courseSettings.fontSize}px`
            }}
          >
            <IonIcon icon={helpOutline} slot="start" />
            PEDIR AYUDA
          </IonButton>
        </div>
      );
    };

    const ImageModal: React.FC = () => (
      <IonModal isOpen={showImageModal} onDidDismiss={() => setShowImageModal(false)}>
        <IonHeader>
          <IonToolbar style={{ '--background': '#2c3e50' }}>
            <IonTitle style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
              Vista Ampliada
            </IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowImageModal(false)} style={{ '--color': 'white' }}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent style={{ '--background': '#000000' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            padding: '20px'
          }}>
            {selectedImage && (
              <img 
                src={selectedImage}
                alt="Vista ampliada"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(255,255,255,0.1)'
                }}
              />
            )}
          </div>
        </IonContent>
      </IonModal>
    );

    const SettingsModal: React.FC = () => (
      <IonModal isOpen={showSettings} onDidDismiss={() => setShowSettings(false)}>
        <IonHeader>
          <IonToolbar style={{ '--background': '#ffffff' }}>
            <IonTitle style={{ color: '#2c3e50', fontSize: '20px', fontWeight: 'bold' }}>
              Configuración del Curso
            </IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowSettings(false)} style={{ '--color': '#2c3e50' }}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent style={{ '--background': '#f8f9fb' }}>
          <div style={{ padding: '20px' }}>
            <IonCard>
              <IonCardContent style={{ padding: '20px' }}>
                <IonItem style={{ '--background': 'transparent', marginBottom: '16px' }}>
                  <IonLabel>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: 'bold', 
                      color: '#2c3e50', 
                      marginBottom: '6px' 
                    }}>
                      Tamaño de Texto
                    </h3>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#7f8c8d', 
                      margin: 0 
                    }}>
                      Ajusta el tamaño para mejor legibilidad
                    </p>
                  </IonLabel>
                  <IonSelect
                    value={courseSettings.fontSize}
                    placeholder="Seleccionar"
                    onIonChange={(e: any) => setCourseSettings({...courseSettings, fontSize: e.detail.value})}
                    style={{
                      '--color': '#2c3e50',
                      '--placeholder-color': '#7f8c8d',
                      minWidth: '140px'
                    }}
                  >
                    <IonSelectOption value={14}>Pequeño (14px)</IonSelectOption>
                    <IonSelectOption value={16}>Normal (16px)</IonSelectOption>
                    <IonSelectOption value={18}>Grande (18px)</IonSelectOption>
                    <IonSelectOption value={20}>Muy Grande (20px)</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem style={{ '--background': 'transparent', marginBottom: '16px' }}>
                  <IonLabel>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: 'bold', 
                      color: '#2c3e50', 
                      marginBottom: '6px' 
                    }}>
                      Velocidad de Audio
                    </h3>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#7f8c8d', 
                      margin: 0 
                    }}>
                      Controla la velocidad de reproducción
                    </p>
                  </IonLabel>
                  <IonSelect
                    value={courseSettings.audioSpeed}
                    placeholder="Seleccionar"
                    onIonChange={(e: any) => {
                      setCourseSettings({...courseSettings, audioSpeed: e.detail.value});
                      if (audioRef.current) {
                        audioRef.current.playbackRate = e.detail.value;
                      }
                    }}
                    style={{
                      '--color': '#2c3e50',
                      '--placeholder-color': '#7f8c8d',
                      minWidth: '120px'
                    }}
                  >
                    <IonSelectOption value={0.5}>0.5x (Lento)</IonSelectOption>
                    <IonSelectOption value={0.75}>0.75x</IonSelectOption>
                    <IonSelectOption value={1}>1x (Normal)</IonSelectOption>
                    <IonSelectOption value={1.25}>1.25x</IonSelectOption>
                    <IonSelectOption value={1.5}>1.5x (Rápido)</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem style={{ '--background': 'transparent' }}>
                  <IonLabel>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: 'bold', 
                      color: '#2c3e50', 
                      marginBottom: '6px' 
                    }}>
                      Reproducción Automática
                    </h3>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#7f8c8d', 
                      margin: 0 
                    }}>
                      Avanzar automáticamente al siguiente contenido
                    </p>
                  </IonLabel>
                  <IonToggle
                    checked={courseSettings.autoPlay}
                    onIonChange={(e: any) => setCourseSettings({...courseSettings, autoPlay: e.detail.checked})}
                    style={{
                      '--handle-background': '#ffffff',
                      '--handle-background-checked': '#ffffff',
                      '--background': '#e3e6ea',
                      '--background-checked': '#7db8a8'
                    }}
                  />
                </IonItem>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </IonModal>
    );

    const InstructionsModal: React.FC = () => (
      <IonModal isOpen={showInstructions} onDidDismiss={() => setShowInstructions(false)}>
        <IonHeader>
          <IonToolbar style={{ '--background': '#ffffff' }}>
            <IonTitle style={{ color: '#2c3e50', fontSize: '20px', fontWeight: 'bold' }}>
              Cómo usar el curso de Cálculo
            </IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowInstructions(false)} style={{ '--color': '#2c3e50' }}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent style={{ '--background': '#ffffff' }}>
          <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ color: '#4a90c2', marginBottom: '12px', fontSize: '18px', fontWeight: 'bold' }}>
                1. Tipos de contenido matemático
              </h4>
              <p style={{ color: '#5a6c7d', lineHeight: '1.6', fontSize: '16px' }}>
                Puedes elegir entre <strong>TEXTO</strong>, <strong>AUDIO</strong> y <strong>VIDEO</strong> para estudiar conceptos de cálculo.
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ color: '#4a90c2', marginBottom: '12px', fontSize: '18px', fontWeight: 'bold' }}>
                2. Gráficas interactivas
              </h4>
              <p style={{ color: '#5a6c7d', lineHeight: '1.6', fontSize: '16px' }}>
                Haz clic en las <strong>gráficas matemáticas</strong> para verlas en tamaño completo y estudiar los detalles.
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ color: '#4a90c2', marginBottom: '12px', fontSize: '18px', fontWeight: 'bold' }}>
                3. Controles de estudio
              </h4>
              <p style={{ color: '#5a6c7d', lineHeight: '1.6', fontSize: '16px' }}>
                Usa <strong>REPETIR</strong> para revisar conceptos y <strong>SIGUIENTE CONCEPTO</strong> para avanzar.
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ color: '#4a90c2', marginBottom: '12px', fontSize: '18px', fontWeight: 'bold' }}>
                4. Personalización para tu comodidad
              </h4>
              <p style={{ color: '#5a6c7d', lineHeight: '1.6', fontSize: '16px' }}>
                Ajusta el tamaño del texto y la velocidad de audio desde el menú de configuración.
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ color: '#4a90c2', marginBottom: '12px', fontSize: '18px', fontWeight: 'bold' }}>
                5. Apoyo cuando lo necesites
              </h4>
              <p style={{ color: '#5a6c7d', lineHeight: '1.6', fontSize: '16px' }}>
                Si necesitas ayuda con algún concepto matemático, usa <strong>PEDIR AYUDA</strong> para contactar al instructor.
              </p>
            </div>
          </div>
        </IonContent>
      </IonModal>
    );

    return (
      <IonApp>
        <IonPage>
          <CustomHeader />
          <IonContent style={{ '--background': '#f8f9fb' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
              <ProgressSection />
              
              <IonGrid>
                <IonRow>
                  <IonCol size="12" sizeLg="8">
                    <ContentArea />
                    <InstructionsArea />
                    <ControlButtons />
                  </IonCol>
                  <IonCol size="12" sizeLg="4">
                    <SidePanel />
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>
          </IonContent>
        </IonPage>

        <SettingsModal />
        <InstructionsModal />
        <ImageModal />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          position="top"
          color="success"
        />

        <style>
          {`
            .ion-page {
              --ion-background-color: #f8f9fb;
            }
            
            * {
              transition: all 0.2s ease !important;
            }
            
            ion-button {
              --padding-top: 12px;
              --padding-bottom: 12px;
              --padding-start: 16px;
              --padding-end: 16px;
              margin: 4px;
            }
            
            ion-card {
              --background: #ffffff;
              --color: #2c3e50;
              box-shadow: 0 2px 8px rgba(0,0,0,0.08) !important;
              border: 1px solid rgba(116, 118, 126, 0.1) !important;
            }
            
            h1, h2, h3, h4, h5, h6 {
              font-family: Arial, sans-serif !important;
              font-weight: bold !important;
              color: #2c3e50 !important;
            }
            
            p, span, div {
              font-family: Arial, sans-serif !important;
              line-height: 1.6 !important;
            }
            
            :root {
              --ion-color-primary: #7db8a8;
              --ion-color-primary-rgb: 125, 184, 168;
              --ion-color-primary-contrast: #ffffff;
              --ion-color-primary-contrast-rgb: 255, 255, 255;
              --ion-color-primary-shade: #6ea394;
              --ion-color-primary-tint: #8abfb2;
            }
            
            ion-button:hover {
              transform: translateY(-1px);
              box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
            }
            
            @media (max-width: 768px) {
              ion-button {
                min-width: 80px !important;
                font-size: 14px !important;
              }
            }
          `}
        </style>
      </IonApp>
    );
  };
  
export default CalculoCursoPag;