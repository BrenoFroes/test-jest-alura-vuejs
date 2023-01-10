import Leilao from '@/components/Leilao'
import { mount } from '@vue/test-utils'

describe('Leilao', () => {
  it('show data of Leilao on card', () => {
    const leilao = {
      lanceInicial: 1,
      produto: 'apontador',
      descricao: 'feito de plastico e ferro inoxidavel'
    }
    const wrapper = mount(Leilao, {
      propsData: {
        leilao
      }
    })
    const header = wrapper.find('.card-header').element
    const title = wrapper.find('.card-title').element
    const text = wrapper.find('.card-text').element

    expect(header.textContent).toContain(`Estamos leiloando um(a): ${leilao.produto}`)
    expect(title.textContent).toContain(`Lance inicial: R$ ${leilao.lanceInicial}`)
    expect(text.textContent).toContain(leilao.descricao)
  })
})
