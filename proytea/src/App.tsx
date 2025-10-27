import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import InicioEstudiante from './pages/InicioEstudiante';
import AyudaEstudiante from './pages/AyudaPag';
import ComunicacionPag from './pages/ComunicacionPag';
import InicioCursosEstudiante from './pages/CursosPag';
import ConfiguracionEstudiante from './pages/ConfiguracionPag';
import FisicaCursoPag from './pages/FisicaCursoPag';
import CalculoCursoPag from './pages/CalculoCursoPag';
import ProgramacionCursoPag from './pages/ProgramacionPag';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Ionic Dark Mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';



setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Rutas */}
          <Route exact path="/Ayuda" component={AyudaEstudiante} />
          <Route exact path="/Comunicacion" component={ComunicacionPag} />
          <Route exact path="/Inicio" component={InicioEstudiante} />
          <Route exact path="/Configuracion" component={ConfiguracionEstudiante} />
          <Route exact path="/Cursos" component={InicioCursosEstudiante} />
          <Route exact path="/FisicaCurso" component={FisicaCursoPag} />
          <Route exact path="/CalculoCurso" component={CalculoCursoPag} />
          <Route exact path="/ProgramacionCurso" component={ProgramacionCursoPag} />


          {/* Redirección corregida */}
          <Redirect exact from="/" to="/Inicio" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
