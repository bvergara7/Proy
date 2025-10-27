// Importaciones necesarias de React, React Router y componentes de Ionic.
// Incluye íconos de Ionicons para crear una interfaz moderna e interactiva.
import React, { useState, useRef } from 'react';
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
  helpCircleOutline, playOutline, planetOutline
} from 'ionicons/icons';

// Interfaces necesarias
// Define las preferencias personalizables del usuario para el curso
// como tamaño de texto, velocidad de audio, modo oscuro, etc.
interface CourseSettings {
  fontSize: number;
  audioSpeed: number;
  darkMode: boolean;
  autoPlay: boolean;
}
//Estructura de cada lección del curso. 
//Incluye texto, enlaces a audio, video e imágenes relacionadas, así como el estado de completado.
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

// Estados principales:
// - selectedTab: controla la pestaña actual seleccionada en la interfaz.
// - currentLesson: identifica la lección actual que se está mostrando.
// - activeContentType: permite alternar entre texto, audio o video.
// - showSettings / showInstructions: controlan la apertura de modales.
// - audio y videoRefs: referencias para controlar manualmente la reproducción multimedia.
const FisicaCursoPag: React.FC = () => {
    const history = useHistory();
    const [selectedTab, setSelectedTab] = useState<string>('cursos');
    const [currentLesson, setCurrentLesson] = useState<string>('1');
    const [showSettings, setShowSettings] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [activeContentType, setActiveContentType] = useState<'text' | 'audio' | 'video'>('text');
    const [isPlaying, setIsPlaying] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [currentAudioTime, setCurrentAudioTime] = useState(0);
    const [audioDuration, setAudioDuration] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    
    const [courseSettings, setCourseSettings] = useState<CourseSettings>({
      fontSize: 16,
      audioSpeed: 1,
      darkMode: false,
      autoPlay: false
    });

    const [courseData] = useState({
      id: '2',
      name: 'Física para Ingeniería',
      code: 'FIS1002',
      progress: 45,
      instructor: '',
      totalLessons: 18,
      completedLessons: 8,
      currentLesson: 'Principios de Mecánica'
    });

    const [lessonsData] = useState<LessonContent[]>([
      {
        id: '1',
        title: 'Introducción a la Mecánica',
        type: 'text',
        content: 'La mecánica es la rama de la física que estudia el movimiento de los objetos y las fuerzas que actúan sobre ellos. En ingeniería, comprender estos principios es fundamental para diseñar estructuras seguras y eficientes.',
        completed: true,
        images: [
          'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRow4HfZqUDfqEDBDoiF3FsB3D-razIdGYED5UPvfvi8_CVN7Is0SYX3mJ0kti-dDhTlh92Mf2L8qFGwfNRJW5LrbW_2AAedOlawlzlbg',
          'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTO43B4sfCdz7VD1HsfV1-0lItw5cjDYCmLxYwY7BtVSzLJJ78S95aT7YXV4njOVc9PFnovqwcnehlNwNRJbxKs0HFFoPe859gVOw4Jhnc'
        ],
        videoSrc: '/src/video/FisLeccion1.mp4',
        audioSrc: '/src/audio/FisAudio1.mp3'
      },
      {
        id: '2',
        title: 'Cinemática: Movimiento en una dimensión',
        type: 'text',
        content: 'La cinemática describe el movimiento sin considerar las causas. Estudiaremos conceptos como posición, velocidad y aceleración en movimiento rectilíneo.',
        completed: true,
        images: [
          'https://cdn.goconqr.com/uploads/node/image/40775750/desktop_1e02bda3-d8d7-49cb-8e01-6528be31f9ca.png',
          'https://ingenieriayciencias.weebly.com/uploads/2/0/6/9/20691564/7367149_orig.jpg'
        ],
        videoSrc: '/src/video/FisLeccion2.mp4',
        audioSrc: '/src/audio/FisAudio2.mp3'
      },
      {
        id: '3',
        title: 'Principios de Mecánica',
        type: 'text',
        content: 'Los principios fundamentales de la mecánica clásica establecen las bases para entender cómo los objetos interactúan en el espacio. La primera ley de Newton establece que un objeto en reposo permanece en reposo y un objeto en movimiento continúa moviéndose a velocidad constante, a menos que una fuerza externa actúe sobre él.',
        completed: false,
        images: [
          'https://departamentmathcoestehaw.wordpress.com/wp-content/uploads/2018/09/fisica-mecanica.jpg?w=640',
          'https://st2.depositphotos.com/3900811/49720/v/450/depositphotos_497209828-stock-illustration-classical-physics-vs-quantum-tunneling.jpg'
        ],
        videoSrc: '/src/video/FisLeccion3.mp4',
        audioSrc: '/src/audio/FisAudio3.mp3'
      }
    ]);

// getCurrentLesson(): Obtiene el objeto de la lección actual a partir de su ID.
// handleImageClick(): Abre un modal con una imagen ampliada.
// handleVideoPlayPause() / handleAudioPlayPause(): Reproducen o pausan el contenido multimedia.
// handleAudioTimeUpdate() / handleAudioLoaded(): Sincronizan el tiempo de reproducción y duración.
// handleAudioSeek(): Permite saltar a un punto específico del audio.
// formatTime(): Convierte segundos a formato mm:ss.
// handleNextLesson() / handlePreviousLesson(): Cambian entre lecciones y detienen el contenido actual.
// handleContentTypeChange(): Cambia entre modos de visualización (texto, audio, video).
// handlePlayPause(): Controla la reproducción según el tipo de contenido seleccionado.
// handleRepeat(): Reinicia el contenido actual.
// handleRequestHelp(): Redirige al usuario a la sección de ayuda.

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
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    };

    const handleAudioPlayPause = () => {
      if (audioRef.current) {
        if (audioRef.current.paused) {
          audioRef.current.play();
          setIsPlaying(true);
        } else {
          audioRef.current.pause();
          setIsPlaying(false);
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
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleNextLesson = () => {
      const currentIndex = lessonsData.findIndex(lesson => lesson.id === currentLesson);
      if (currentIndex < lessonsData.length - 1) {
        setCurrentLesson(lessonsData[currentIndex + 1].id);
        setToastMessage('Avanzando a la siguiente lección');
        setShowToast(true);
        
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
        
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      } else {
        setToastMessage('Has completado todas las lecciones disponibles');
        setShowToast(true);
      }
    };

    const handlePreviousLesson = () => {
      const currentIndex = lessonsData.findIndex(lesson => lesson.id === currentLesson);
      if (currentIndex > 0) {
        setCurrentLesson(lessonsData[currentIndex - 1].id);
        setToastMessage('Regresando a la lección anterior');
        setShowToast(true);
        
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
        
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    };

    const handleContentTypeChange = (type: 'text' | 'audio' | 'video') => {
      setActiveContentType(type);
      
      if (type !== 'video' && videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
      
      if (type !== 'audio' && audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      
      setToastMessage(`Cambiando a modo ${type === 'text' ? 'texto' : type === 'audio' ? 'audio' : 'video'}`);
      setShowToast(true);
    };

    const handlePlayPause = () => {
      if (activeContentType === 'video') {
        handleVideoPlayPause();
      } else if (activeContentType === 'audio') {
        handleAudioPlayPause();
      } else {
        setIsPlaying(!isPlaying);
      }
      setToastMessage(isPlaying ? 'Pausado' : 'Reproduciendo');
      setShowToast(true);
    };

    const handleRepeat = () => {
      if (activeContentType === 'video' && videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setIsPlaying(true);
      } else if (activeContentType === 'audio' && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setIsPlaying(true);
      }
      setToastMessage('Repitiendo contenido actual');
      setShowToast(true);
    };

    const handleRequestHelp = () => {
      history.push('/Ayuda');
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
              <IonIcon icon={planetOutline} style={{ fontSize: '24px' }} />
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
                {/* Elemento de audio oculto */}
                <audio
                  ref={audioRef}
                  src={lesson.audioSrc}
                  onTimeUpdate={handleAudioTimeUpdate}
                  onLoadedMetadata={handleAudioLoaded}
                  onEnded={() => setIsPlaying(false)}
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
                  cursor: 'pointer'
                }} onClick={handleAudioPlayPause}>
                  <IonIcon icon={isPlaying ? pauseOutline : volumeHighOutline} />
                </div>
                
                {/* Controles de audio */}
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
                    <IonIcon icon={isPlaying ? pauseOutline : playOutline} slot="start" />
                    {isPlaying ? 'PAUSAR' : 'REPRODUCIR'}
                  </IonButton>
                  <IonButton
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.currentTime = 0;
                        audioRef.current.play();
                        setIsPlaying(true);
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
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
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
                        <IonIcon icon={isPlaying ? pauseOutline : playOutline} slot="start" />
                        {isPlaying ? 'PAUSAR' : 'REPRODUCIR'}
                      </IonButton>
                      <IonButton
                        onClick={() => videoRef.current && (videoRef.current.currentTime = 0)}
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
          <p>1. Lee el contenido de física con atención</p>
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
                Gráfica de Física {index + 1}
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
                  alt={`Gráfica de física ${index + 1} de ${lesson.title}`}
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
 // Muestra la imagen seleccionada en vista ampliada con opción de cerrar.

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

    //Permite configurar las preferencias del usuario (texto, audio, autoplay).
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
                      <IonSelectOption value={14} style={{ color: '#2c3e50' }}>
                        Pequeño (14px)
                      </IonSelectOption>
                      <IonSelectOption value={16} style={{ color: '#2c3e50' }}>
                        Normal (16px)
                      </IonSelectOption>
                      <IonSelectOption value={18} style={{ color: '#2c3e50' }}>
                        Grande (18px)
                      </IonSelectOption>
                      <IonSelectOption value={20} style={{ color: '#2c3e50' }}>
                        Muy Grande (20px)
                      </IonSelectOption>
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
                      <IonSelectOption value={0.5} style={{ color: '#2c3e50' }}>
                        0.5x (Lento)
                      </IonSelectOption>
                      <IonSelectOption value={0.75} style={{ color: '#2c3e50' }}>
                        0.75x
                      </IonSelectOption>
                      <IonSelectOption value={1} style={{ color: '#2c3e50' }}>
                        1x (Normal)
                      </IonSelectOption>
                      <IonSelectOption value={1.25} style={{ color: '#2c3e50' }}>
                        1.25x
                      </IonSelectOption>
                      <IonSelectOption value={1.5} style={{ color: '#2c3e50' }}>
                        1.5x (Rápido)
                      </IonSelectOption>
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

  // InstructionsModal: Explica cómo usar la plataforma de forma interactiva y accesible.
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
          <IonTabs>
            <IonTab tab="cursos">
              <IonPage>
                <CustomHeader />
                <IonContent style={{ '--background': '#f8f9fb' }}>
                  <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                    <ProgressSection />
                    
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12" size-lg="8">
                          <ContentArea />
                          <InstructionsArea />
                          <ControlButtons />
                        </IonCol>
                        <IonCol size="12" size-lg="4">
                          <SidePanel />
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </div>
                </IonContent>
              </IonPage>
            </IonTab>
  
            <IonTab tab="inicio">
              <IonPage>
                <CustomHeader />
                <IonContent style={{ '--background': '#f8f9fb' }}>
                  <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2c3e50', marginBottom: '20px' }}>
                      Inicio
                    </h2>
                    <IonCard>
                      <IonCardContent style={{ padding: '24px' }}>
                        <p style={{ fontSize: '16px', color: '#2c3e50' }}>
                          Regresa a la página principal de cursos de matemáticas
                        </p>
                      </IonCardContent>
                    </IonCard>
                  </div>
                </IonContent>
              </IonPage>
            </IonTab>
  
            
          </IonTabs>
  
          {/* Modales */}
          <SettingsModal />
          <InstructionsModal />
          <ImageModal />
  
          {/* Toast de notificaciones */}
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={toastMessage}
            duration={3000}
            position="top"
            color="success"
          />
  
          {/* Estilos CSS personalizados para estudiantes con TEA, dichos estilos aplican 
          transiciones suaves, accesibilidad visual (contrastes claros),
         y se adaptan a pantallas pequeñas mediante media queries.
         Se definen variables CSS globales de Ionic para mantener una paleta de colores coherente.*/}
          
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
              
              .content-spacing > * {
                margin-bottom: 16px !important;
              }
              
              ion-button:focus,
              ion-item:focus {
                outline: 2px solid #7db8a8 !important;
                outline-offset: 2px !important;
              }
              
              ion-toolbar {
                --background: #ffffff !important;
                --color: #2c3e50 !important;
                --border-color: transparent !important;
              }
              
              .main-content {
                background: #ffffff !important;
                color: #2c3e50 !important;
                padding: 24px !important;
                border-radius: 12px !important;
              }
              
              .settings-modal ion-select {
                --color: #2c3e50 !important;
                --placeholder-color: #7f8c8d !important;
                font-weight: bold !important;
              }
              
              .settings-modal ion-select-option {
                --color: #2c3e50 !important;
                font-weight: 600 !important;
              }
              
              ion-select-popover ion-item {
                --color: #2c3e50 !important;
                --background: #ffffff !important;
                font-weight: 600 !important;
              }
              
              ion-select-popover ion-radio {
                --color: #7db8a8 !important;
                --color-checked: #7db8a8 !important;
              }
              
              ion-select-popover ion-label {
                color: #2c3e50 !important;
                font-weight: 600 !important;
              }
              
              @media (prefers-reduced-motion: reduce) {
                * {
                  animation-duration: 0.01ms !important;
                  animation-iteration-count: 1 !important;
                  transition-duration: 0.01ms !important;
                }
              }
              
              ion-toggle {
                --handle-background: #ffffff !important;
                --handle-background-checked: #ffffff !important;
                --background: #e3e6ea !important;
                --background-checked: #7db8a8 !important;
                --handle-box-shadow: 0 2px 6px rgba(0,0,0,0.16) !important;
              }
              
              .image-container {
                position: relative;
                overflow: hidden;
                border-radius: 8px;
                cursor: pointer;
              }
              
              .image-container:hover {
                box-shadow: 0 4px 16px rgba(0,0,0,0.2) !important;
              }
              
              .image-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.1);
                opacity: 0;
                transition: opacity 0.2s ease;
              }
              
              .image-container:hover .image-overlay {
                opacity: 1;
              }
              
              * {
                font-family: Arial, Helvetica, sans-serif !important;
              }
              
              @media (max-width: 768px) {
                .ion-col {
                  padding: 8px !important;
                }
                
                ion-button {
                  min-width: 80px !important;
                  font-size: 14px !important;
                }
              }
              
              .ion-tab-bar {
                border-top: 1px solid rgba(116, 118, 126, 0.2) !important;
              }
              
              .ion-tab-button {
                padding: 8px !important;
                min-height: 50px !important;
              }
              
              .lesson-content {
                font-size: 16px !important;
                line-height: 1.8 !important;
                color: #2c3e50 !important;
                text-align: justify !important;
              }
              
              .offline-indicator {
                background: #f39c12 !important;
                color: white !important;
                padding: 4px 8px !important;
                border-radius: 4px !important;
                font-size: 12px !important;
              }
              
              .ion-content {
                --overflow: hidden !important;
              }
              
              .content-scroll {
                overflow-y: auto !important;
                height: 100% !important;
              }
            `}
          </style>
        </IonApp>
      );
    };

export default FisicaCursoPag;