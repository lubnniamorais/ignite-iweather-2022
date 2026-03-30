import { mockCityAPIResponse } from '@__tests__/mocks/api/mockCityAPIResponse';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@__tests__/utils/customRender';

import { Search } from '@screens/Search';
import { api } from '@services/api';

describe('Screen: Search', () => {
  it('should be show city option.', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({
      data: mockCityAPIResponse,
    });

    const { debug } = await waitFor(() => render(<Search />));

    const searchInput = screen.getByTestId('search-input');

    // O método fireEvent permite simular um evento no componente
    fireEvent.changeText(searchInput, 'São Paulo');

    const option = await screen.findByText(/são paulo/i);

    debug();
    expect(option).toBeTruthy();
  });
});
