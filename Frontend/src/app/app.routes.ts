import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { StudentLogin } from './student-login/student-login';
import { StudentDashboard } from './student-dashboard/student-dashboard';
import { StudentProfile } from './student-profile/student-profile';
import { StudentAttendance } from './student-attendance/student-attendance';
import { StudentSchedule } from './student-schedule/student-schedule';
import { StudentSubjects } from './student-subjects/student-subjects';
import { StudentCertificates } from './student-certificates/student-certificates';
import { StudentFees } from './student-fees/student-fees';
import { StudentNotices } from './student-notices/student-notices';
import { Dashboard } from './dashboard/dashboard';
import { AddCourse } from './add-course/add-course';
import { Notices } from './notices/notices';
import { Settings } from './settings/settings';
import { Home } from './home/home';
import { AddStudent } from './add-student/add-student';
import { Certificates } from './certificates/certificates';
import { Basic } from './basic/basic';
import { Programming } from './programming/programming';
import { Other } from './other/other';
import { Enquiry } from './enquiry/enquiry';
import { CertificateComponent } from './verifycertificate/verifycertificate';
import { About } from './about/about';
import { Carousel } from './carousel/carousel';
import { Gallery } from './gallery/gallery';
import { Banner } from './banner/banner';
import { Footer } from './footer/footer';
import { FeedBack } from './feed-back/feed-back';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    {path: 'about', component: About},
    {path: 'banner', component: Banner},
    {path: 'gallery', component: Gallery},
    {path: 'carousel', component: Carousel},
    {path: 'feed-back', component: FeedBack},
    {path: 'footer', component: Footer},
    { path: 'admin-login', component: Login },
    { path: 'admin', redirectTo: 'admin-login', pathMatch: 'full' },
    { path: 'student-login', component: StudentLogin },
    { path: 'student-register', component: Register },
    { path: 'student-dashboard', component: StudentDashboard },
    { path: 'student-profile', component: StudentProfile },
    { path: 'student-attendance', component: StudentAttendance },
    { path: 'student-schedule', component: StudentSchedule },
    { path: 'student-subjects', component: StudentSubjects },
    { path: 'student-certificates', component: StudentCertificates },
    { path: 'student-fees', component: StudentFees },
    { path: 'student-notices', component: StudentNotices },
    { path: 'dashboard', component: Dashboard },
    { path: 'add-student', component: AddStudent },
    { path: 'certificates', component: Certificates },
    { path: 'add-course', component: AddCourse },
    { path: 'courses', component: Basic },
    { path: 'enquiry', component: Enquiry }, 
     { path: 'verify-certificate', component: CertificateComponent }, 
    { path: 'notices', component: Notices },
    { path: 'settings', component: Settings },
    { path: 'login', redirectTo: 'admin-login', pathMatch: 'full' },
    { path: 'register', redirectTo: 'student-register', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
