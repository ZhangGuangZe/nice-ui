import { test, describe, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { Button } from '../index'

describe('Button', () => {
  test('should render', () => {
    const { getByRole } = render(Button)
    getByRole('button')
  })

  test('slot should work', () => {
    const { getByText } = render(Button, {
      slots: {
        default() {
          return '按钮'
        }
      }
    })
    getByText('按钮')
  })

  test('default type should be default', () => {
    const { getByRole } = render(Button)
    const button = getByRole('button')
    expect(button.classList.contains('ni-button--default')).toBe(true)
  })

  test('prop type should work', () => {
    const { getByRole } = render(Button, {
      props: {
        type: 'primary'
      }
    })
    const button = getByRole('button')
    expect(button.classList.contains('ni-button--primary')).toBe(true)
  })
})
