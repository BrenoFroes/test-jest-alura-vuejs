import NovoLeilao from '@/views/NovoLeilao.vue'
import { mount } from '@vue/test-utils'
import { createLeilao } from '@/http'

jest.mock('@/http')

const $router = {
  push: jest.fn()
}

describe('NovoLeilao', () => {
  it('a NovoLeilao must be createad, since a filled form', () => {
    createLeilao.mockResolvedValueOnce()
    const wrapper = mount(NovoLeilao, {
      mocks: {
        $router
      }
    })

    wrapper.find('.produto').setValue('Um livro da casa do código')
    wrapper.find('.descricao').setValue('livre bem interessante')
    wrapper.find('.produto').setValue(53)
    wrapper.find('form').trigger('submit')

    expect(createLeilao).toHaveBeenCalled()
  })
})
