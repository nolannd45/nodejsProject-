import MainHome from '../components/MainHome';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('MainHome Component', () => {
  test('renders main title correctly', () => {
    render(
      <Router>
        <MainHome />
      </Router>
    );

    const mainTitle = screen.getByText("Selectionner l'hôtel de vos rêves!");
    expect(mainTitle).toBeInTheDocument();
  });

  // Ajoutez d'autres tests ici en fonction de vos besoins
});