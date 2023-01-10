import Avaliador from '@/views/Avaliador'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leiloes = [
  {
    lanceInicial: 1,
    produto: 'apontador',
    descricao: 'feito de plastico e ferro inoxidavel'
  },
  {
    lanceInicial: 2,
    produto: 'lapiseira',
    descricao: 'feito de plastico e ferro inoxidavel'
  },
  {
    lanceInicial: 3,
    produto: 'lapis',
    descricao: 'feito de plastico e ferro inoxidavel'
  }
]
describe('Avaliador', () => {
  it('Show all Leilao returned through API', async () => {
    getLeiloes.mockResolvedValueOnce(leiloes)
    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    await flushPromises()
    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(leiloes.length)
  })
  it('There isnt Leilao returned through API', async () => {
    getLeiloes.mockResolvedValueOnce([])
    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    await flushPromises()
    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(0)
  })
})
