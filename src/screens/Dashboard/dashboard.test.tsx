import { mockCityAPIResponse } from '@__tests__/mocks/api/mockCityAPIResponse';
import { mockWeatherAPIResponse } from '@__tests__/mocks/api/mockWeatherAPIResponse';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@__tests__/utils/customRender';

import { saveStorageCity } from '@libs/asyncStorage/cityStorage';

import { Dashboard } from '@screens/Dashboard';
import { api } from '@services/api';

describe('Screen: Dashboard', () => {
  beforeAll(async () => {
    const city = {
      id: '1',
      name: 'Rio do, BR',
      latitude: 123,
      longitude: 456,
    };

    await saveStorageCity(city);
  });

  afterAll(() => {});

  it('should be show a city weather', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({
      data: mockWeatherAPIResponse,
    });

    await waitFor(() => render(<Dashboard />));

    const cityName = await screen.findByText(/são paulo/i);

    expect(cityName).toBeTruthy();
  });

  it('should be show another selected weather city', async () => {
    /*
      1 - Busca as informações do tempo/clima da cidade selecionada.
      2 - Busca as informações da cidade.
      3 - Busca as informações do tempo/clima da nova cidade selecionada.
    */

    jest
      .spyOn(api, 'get')
      .mockResolvedValueOnce({
        data: mockWeatherAPIResponse,
      })
      .mockResolvedValueOnce({
        data: mockCityAPIResponse,
      })
      .mockResolvedValueOnce({
        data: mockWeatherAPIResponse,
      });

    await waitFor(() => render(<Dashboard />));

    await waitForElementToBeRemoved(() => screen.queryByTestId('loading'));

    const cityName = 'São Paulo';

    await waitFor(
      async () =>
        await act(() => {
          const search = screen.getByTestId('search-input');
          fireEvent.changeText(search, cityName);
        })
    );

    waitFor(() =>
      act(() => {
        fireEvent.press(screen.getByText(cityName, { exact: false }));
      })
    );

    expect(screen.getByText(cityName, { exact: false })).toBeTruthy();
  });
});
