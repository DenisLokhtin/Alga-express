import { useNavigate } from 'react-router-dom';
import History from '../../History';

const CustomNavigate = () => {
    History.navigate = useNavigate();

    return null;
};

export default CustomNavigate;