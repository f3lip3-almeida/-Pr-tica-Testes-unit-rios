
import Netflix from '../model/Netflix';
import { DatabaseModel, mockQuery } from '../model/DatabaseModel';

describe('Netflix Model', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpar os mocks antes de cada teste
    });

    describe('listarNetflixTitles', () => {
        it('Deve retornar a lista de títulos da Netflix com sucesso', async () => {
            const mockData = {
                rows: [
                    {
                        show_id: "s1",
                        tipo: "Movie",
                        titulo: "Dick Johnson Is Dead",
                        diretor: "Kirsten Johnson",
                        elenco: null,
                        pais: "United States",
                        adicionado: "September 25, 2021",
                        ano_lancamento: 2020,
                        classificacao: "PG-13",
                        duracao: "90 min",
                        listado_em: "Documentaries",
                        descricao: "As her father nears the end of his life, filmmaker Kirsten Johnson stages his death in inventive and comical ways to help them both face the inevitable."
                    }
                ],
            };

            mockQuery.mockResolvedValue(mockData);

            const result = await Netflix.listarNetflixTitles();

            expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM netflix_titles;');
            expect(result).toEqual(mockData.rows);
        });

        it('Deve retornar uma mensagem de erro quando a query falhar', async () => {
            mockQuery.mockRejectedValue(new Error('Database error'));

            const result = await Netflix.listarNetflixTitles();

            expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM netflix_titles;');
            expect(result).toBe('error, verifique os logs do servidor');
        });
    });

    describe('removerNetflixTitle', () => {
        it('Deve remover um título da Netflix com sucesso e retornar true', async () => {
            const mockDeleteResponse = {
                rowCount: 1,
            };

            mockQuery.mockResolvedValue(mockDeleteResponse);

            const result = await Netflix.removerNetflixTitle('s1');

            expect(mockQuery).toHaveBeenCalledWith("DELETE FROM netflix_titles WHERE show_id='s1'");
            expect(result).toBe(true);
        });

        it('Deve retornar false quando nenhuma linha é afetada pela remoção', async () => {
            const mockDeleteResponse = {
                rowCount: 0,
            };

            mockQuery.mockResolvedValue(mockDeleteResponse);

            const result = await Netflix.removerNetflixTitle('s1');

            expect(mockQuery).toHaveBeenCalledWith("DELETE FROM netflix_titles WHERE show_id='s1'");
            expect(result).toBe(false);
        });

        it('Deve retornar false quando ocorrer um erro ao remover um título', async () => {
            mockQuery.mockRejectedValue(new Error('Database error'));

            const result = await Netflix.removerNetflixTitle('s1');

            expect(mockQuery).toHaveBeenCalledWith("DELETE FROM netflix_titles WHERE show_id='s1'");
            expect(result).toBe(false);
        });
    });
});