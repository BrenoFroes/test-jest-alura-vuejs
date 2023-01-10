import Leiloeiro from '@/views/Leiloeiro'
import { mount } from '@vue/test-utils'
import { getLeilao, getLances } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leilao = {
  lanceInicial: 1,
  produto: 'apontador',
  descricao: 'feito de plastico e ferro inoxidavel'
}

const lances = [
  {
    id: 1,
    valor: 1001,
    data: '2020-06-13T18:04:26.826Z',
    leilao_id: 1
  },
  {
    id: 2,
    valor: 1002,
    data: '2020-06-13T18:04:26.826Z',
    leilao_id: 1
  },
  {
    id: 3,
    valor: 1003,
    data: '2020-06-13T18:04:26.826Z',
    leilao_id: 1
  },
  {
    id: 4,
    valor: 1004,
    data: '2020-06-13T18:04:26.826Z',
    leilao_id: 1
  }
]

describe('Leilao', () => {
  it('Leiloeiro starts a Leilao that doesnt have Lances', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce([])

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromises()
    const alert = wrapper.find('.alert-dark')
    expect(alert.exists()).toBe(true)
  })

  it('a Leiloeiro doesnt show the alert "sem lances"', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })

    await flushPromises()
    const alert = wrapper.find('.alert-dark')
    expect(alert.exists()).toBe(false)
  })

  it('a Leiloeiro hasnt a list of Lances', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    await flushPromises()
    const list = wrapper.find('.list-inline')
    expect(list.exists()).toBe(true)
  })

  it('a Leiloeiro alerts the bigger value', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    await flushPromises()
    const biggerValue = wrapper.find('.maior-lance')
    expect(biggerValue.exists()).toBe(true)
  })

  it('a Leiloeiro alerts the smaller value', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    await flushPromises()
    const smallerValue = wrapper.find('.menor-lance')
    expect(smallerValue.element.textContent).toContain('Menor lance: R$ 1001')
  })
})
