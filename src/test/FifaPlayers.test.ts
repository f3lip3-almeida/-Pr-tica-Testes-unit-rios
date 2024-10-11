
import FifaPlayers from '../model/FifaPlayers';
import { DatabaseModel, mockQuery } from '../model/DatabaseModel';

describe('FifaPlayers Model', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpar os mocks antes de cada teste
    });

    describe('listarFifaPlayers', () => {
        it('Deve retornar a lista de jogadores com sucesso', async () => {
            const mockData = {
                rows: [
                    {
                        playerid: 2,
                        playername: "Diego Maradona",
                        foot: "Left",
                        playerposition: "CAM",
                        awr: "High",
                        dwr: "Med",
                        ovr: "97",
                        pac: "92",
                        sho: "93",
                        pas: "92",
                        dri: "97",
                        def: "40",
                        phy: "76",
                        sm: "5",
                        div: "NA",
                        pos: "NA",
                        han: "NA",
                        reff: "NA",
                        kic: "NA",
                        spd: "NA",
                    }
                ],
            };

            mockQuery.mockResolvedValue(mockData);

            const result = await FifaPlayers.listarFifaPlayers();

            expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM fifa_players;');
            expect(result).toEqual(mockData.rows);
        });

        it('Deve retornar uma mensagem de erro quando a query falhar', async () => {
            mockQuery.mockRejectedValue(new Error('Database error'));

            const result = await FifaPlayers.listarFifaPlayers();

            expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM fifa_players;');
            expect(result).toBe('error, verifique os logs do servidor');
        });
    });

    describe('removerFifaPlayer', () => {
        it('Deve remover um jogador com sucesso e retornar true', async () => {
            const mockDeleteResponse = {
                rowCount: 1,
            };

            mockQuery.mockResolvedValue(mockDeleteResponse);

            const result = await FifaPlayers.removerFifaPlayer(2);

            expect(mockQuery).toHaveBeenCalledWith("DELETE FROM fifa_players WHERE playerid=2");
            expect(result).toBe(true);
        });

        it('Deve retornar false quando nenhuma linha é afetada pela remoção', async () => {
            const mockDeleteResponse = {
                rowCount: 0,
            };

            mockQuery.mockResolvedValue(mockDeleteResponse);

            const result = await FifaPlayers.removerFifaPlayer(2);

            expect(mockQuery).toHaveBeenCalledWith("DELETE FROM fifa_players WHERE playerid=2");
            expect(result).toBe(false);
        });

        it('Deve retornar false quando ocorrer um erro ao remover um jogador', async () => {
            mockQuery.mockRejectedValue(new Error('Database error'));

            const result = await FifaPlayers.removerFifaPlayer(2);

            expect(mockQuery).toHaveBeenCalledWith("DELETE FROM fifa_players WHERE playerid=2");
            expect(result).toBe(false);
        });
    });
});