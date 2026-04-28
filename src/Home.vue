<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useFetch } from './scripts/fetch'
import Banner from './components/Banner.vue'

const apiBaseUrl = 'https://api.frankfurter.dev/v2'
 
const selectedCurrency = ref('UAH')
const amount = ref(1)
const targetCurrencies = reactive(['USD', 'EUR', 'PLN', 'AED', 'UAH'])

// Load from localStorage on init
const storedTargetCurrencies = localStorage.getItem('targetCurrencies')
if (storedTargetCurrencies) {
  const parsedCurrencies = JSON.parse(storedTargetCurrencies)
  if (Array.isArray(parsedCurrencies)) {
    targetCurrencies.splice(0, targetCurrencies.length, ...parsedCurrencies)
  }
}

const { data: allCurrencies } = useFetch(`${apiBaseUrl}/currencies`)
 
const data = ref(null)

const getCurrencyName = (currencyCode: string) => {
  const allCurrenciesArray = allCurrencies.value as Array<{ iso_code: string; name: string }> | null
  const currency = allCurrenciesArray?.find(item => item.iso_code === currencyCode)
  return currency?.name
}

// const { data, error } = useFetch(`${apiBaseUrl}/rates?base=${selectedCurrency.value}&quotes=${targetCurrencies.join(',')}`)

// https://api.frankfurter.dev/v2/rates?base=UAH&quotes=USD,EUR,PLN,AED,UAH

// rozetka.ua

// api.rozetka.ua/api/

watch(
  [selectedCurrency, targetCurrencies, amount], 
  async () => {
    const response = await fetch(
        `${apiBaseUrl}/rates?base=${selectedCurrency.value}&quotes=${targetCurrencies.join(',')}`
    )
    data.value = await response.json()
  },
  { immediate: true }
)

const newCurrency = ref('')

const addCurrency = () => {
  if (!newCurrency.value) return

  if (targetCurrencies.includes(newCurrency.value)) {
    alert('Already added')
    return
  }

  targetCurrencies.push(newCurrency.value)
  newCurrency.value = ''

  localStorage.setItem('targetCurrencies', JSON.stringify(targetCurrencies))
}

</script>

<template>
<main>
    <section class="exchange__section">
        <div class="container-xxl">
            <h1 class="exchange__title">Exchange rate</h1>
            <label class="exchange__label" for="currencies">Choose a currency:</label>
            <select class="exchange__select" id="currencies" v-model="selectedCurrency">
                <option
                class="exchange__option"
                v-for="currency in allCurrencies"
                :key="currency"
                :value="currency.iso_code"
                >
                {{ currency.iso_code }} ({{ getCurrencyName(currency.iso_code) }})
                </option>
            </select>
            <label class="exchange__amount-label" for="amount">Amount:</label>
            <input class="exchange__amount" type="number" v-model="amount" />
            <div class="exchange__rates">
                <div
                v-for="item in data"
                :key="item.quote"
                class="exchange__rate-item"
                >
                    <span class="exchange__currency">
                        {{ item.quote }} ({{ getCurrencyName(item.quote) }})
                    </span>
                    <span class="exchange__rate">
                        {{ (item.rate * amount).toFixed(2) }}
                    </span>
                </div>
            </div>
            <div class="exchange-add">
                <button class="add-btn">+</button>
                <select
                    class="exchange__select-add"
                    name="currenciesAddButton"
                    v-model="newCurrency"
                    @change="addCurrency"
                >
                    <option disabled value="">Select currency</option>
                    <option
                    v-for="currency in allCurrencies"
                    :key="currency.iso_code"
                    :value="currency.iso_code"
                    >
                        {{ currency.iso_code }} ({{ getCurrencyName(currency.iso_code) }})
                    </option>
                </select>
            </div>
        </div>
    </section>
</main>
</template>

<style scoped lang="scss">
    .exchange__section {
        background: linear-gradient(180deg, #F7F4F2 0%, #EFEAE7 100%);
        min-height: 100vh;
        padding: 2rem 0;

        /* title */
        .exchange__title {
            font-size: 2rem;
            font-weight: 600;
            color: #2B2B2B;
            margin-bottom: 1.5rem;
        }

        /* rates container */
        .exchange__rates {
            margin-top: 1.5rem;
        }

        /* rate item */
        .exchange__rate-item {
            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: 1rem 1.2rem;
            margin: 0.4rem 0;

            border-radius: 1rem;
            background: $color-white;

            transition: all 0.2s ease;

            &:hover {
                transform: scale(1.02);
                box-shadow: 0 0.3125rem 0.9375rem rgba(0, 0, 0, 0.08);
            }
        }

        .exchange__currency {
            font-size: 0.95rem;
            color: #7A7A7A;
        }

        .exchange__rate {
            font-weight: 600;
            font-size: 1.1rem;
            color: #2B2B2B;
        }

        .exchange__select {
            width: 100%;
        }
        
        .exchange__select,
        .exchange__amount {
            margin-top: 0.5rem;

            padding: 0.8rem 1rem;
            border-radius: 1rem;

            border: 0.0625rem solid #E5E5E5;
            background: $color-white;

            font-size: 1rem;
            transition: all 0.2s ease;

            &:focus {
            outline: none;
            border-color: $color-primary;
            box-shadow: 0 0 0 0.25rem rgba(209, 120, 98, 0.15);
            }
        }

        /* labels */
        .exchange__label,
        .exchange__amount-label {
            display: block;
            margin-top: 1rem;

            font-size: 0.85rem;
            color: #7A7A7A;
        }

        /* add button wrapper */
        .exchange-add {
            position: relative;
            display: inline-block;
            margin-top: 2rem;

            .add-btn {
                width: 3.2rem;
                height: 3.2rem;

                border-radius: 50%;
                border: none;

                background: linear-gradient(135deg, #D17862, #E8A598);
                color: #fff;

                font-size: 1.6rem;
                font-weight: 500;

                box-shadow: 0 0.625rem 1.5625rem rgba(209, 120, 98, 0.4);

                cursor: pointer;
                transition: all 0.2s ease;

                &:hover {
                    transform: scale(1.1);
                }

                &:active {
                    transform: scale(0.95);
                }
            }

            .exchange__select-add {
                position: absolute;
                inset: 0;
                opacity: 0;
                cursor: pointer;
            }
        }
    }
</style>
