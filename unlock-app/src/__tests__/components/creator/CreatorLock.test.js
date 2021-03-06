import React from 'react'
import * as rtl from '@testing-library/react'
import { Provider } from 'react-redux'

import { CreatorLock } from '../../../components/creator/CreatorLock'
import configure from '../../../config'
import createUnlockStore from '../../../createUnlockStore'
import { UNLIMITED_KEYS_COUNT } from '../../../constants'
import { ConfigContext } from '../../../utils/withConfig'
import { Web3ServiceContext } from '../../../utils/withWeb3Service'

const Web3ServiceProvider = Web3ServiceContext.Provider

jest.mock('next/link', () => {
  return ({ children }) => children
})

const lock = {
  address: '0x1234567890',
  transaction: 'transactionid',
  keyPrice: '0.1',
  balance: '1',
  expirationDuration: 100,
}
const keylock = {
  address: '0x1234567890',
  transaction: 'transactionid',
  keyPrice: '1',
  balance: '1',
  outstandingKeys: 1,
  maxNumberOfKeys: 10,
  expirationDuration: 100,
}
const unlimitedlock = {
  address: '0x1234567890',
  transaction: 'transactionid',
  keyPrice: '1',
  balance: '1',
  outstandingKeys: 1,
  maxNumberOfKeys: UNLIMITED_KEYS_COUNT,
  unlimitedKeys: true,
  expirationDuration: 100,
}

const transaction = {
  address: '0x0987654321',
  confirmations: 12,
  status: 'mined',
  lock: 'lockid',
}

const ConfigProvider = ConfigContext.Provider

const web3Service = {
  off: () => {},
}
describe('CreatorLock', () => {
  it('should show integration tab when the button is clicked', () => {
    expect.assertions(2)
    const config = configure()

    const store = createUnlockStore({
      transactions: {
        transactionid: transaction,
      },
    })

    const wrapper = rtl.render(
      <Web3ServiceProvider value={web3Service}>
        <ConfigProvider value={config}>
          <Provider store={store}>
            <CreatorLock lock={lock} updateLock={() => {}} />
          </Provider>
        </ConfigProvider>
      </Web3ServiceProvider>
    )

    expect(
      wrapper.queryByText('Easily integrate Unlock into your application', {
        exact: false,
      })
    ).toBeNull()

    const codeButton = wrapper.getByTitle('Integrations')
    rtl.fireEvent.click(codeButton)

    expect(
      wrapper.queryByText('Easily integrate Unlock into your application', {
        exact: false,
      })
    ).not.toBeNull()
  })

  it('should open the edit form when the button is clicked', () => {
    expect.assertions(0)
    const config = configure()

    const store = createUnlockStore({
      transactions: {
        transactionid: transaction,
      },
      account: {},
    })

    const wrapper = rtl.render(
      <Web3ServiceProvider value={web3Service}>
        <ConfigProvider value={config}>
          <Provider store={store}>
            <CreatorLock lock={lock} updateLock={() => {}} />
          </Provider>
        </ConfigProvider>
      </Web3ServiceProvider>
    )

    const editButton = wrapper.getByTitle('Edit')
    rtl.fireEvent.click(editButton)

    wrapper.getByDisplayValue('0.1')
  })

  it('should display the correct number of keys', () => {
    expect.assertions(1)
    const config = configure()

    const store = createUnlockStore({
      transactions: {
        transactionid: transaction,
      },
      locks: {
        [keylock.address]: keylock,
      },
    })

    const wrapper = rtl.render(
      <Web3ServiceProvider value={web3Service}>
        <ConfigProvider value={config}>
          <Provider store={store}>
            <CreatorLock lock={keylock} updateLock={() => {}} />
          </Provider>
        </ConfigProvider>
      </Web3ServiceProvider>
    )

    expect(wrapper.queryByText('1/10')).not.toBeNull()
  })

  it('should display infinite keys correctly', () => {
    expect.assertions(1)
    const config = configure()

    const store = createUnlockStore({
      transactions: {
        transactionid: transaction,
      },
      locks: {
        [unlimitedlock.address]: unlimitedlock,
      },
    })

    const wrapper = rtl.render(
      <Web3ServiceProvider value={web3Service}>
        <ConfigProvider value={config}>
          <Provider store={store}>
            <CreatorLock lock={unlimitedlock} updateLock={() => {}} />
          </Provider>
        </ConfigProvider>
      </Web3ServiceProvider>
    )

    expect(wrapper.queryByText('1/∞')).not.toBeNull()
  })
})
