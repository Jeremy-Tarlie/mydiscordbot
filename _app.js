import AOS from 'aos';
import 'aos/dist/aos.css';

useEffect(() => {
  AOS.init({
    duration: 1000,
    once: true
  });
}, []);