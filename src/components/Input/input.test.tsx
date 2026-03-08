import { render } from '@testing-library/react-native';

import { Input } from '.';

describe('Component: Input', () => {
  it('should be render without activity indicator', () => {
    // A função render é para renderizar o componente
    const { debug } = render(<Input />);
    debug();
  });
});
