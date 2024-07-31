<template>
  <div class="product">
    <img class="product_img" :src="imageSrc" :alt="product.attributes.title">
    <div class="product__info">
        <div v-if="product.attributes.published === true">
            <h3>{{ product.attributes.title }}</h3>
            <div class="price">
                <span
                :class="
                    product.attributes.quantity == 0 ? 'no_stock' : 'in_stock'"
                ></span>
                <span>precio: {{ product.attributes.price }}</span>
            </div>
            <div class="stock">
                <span>
                    Cantidad en bodega:
                    <template v-if="product.attributes.quantity === 0">
                        Sin stock en bodega
                    </template>
                    <template v-else>
                        {{ product.attributes.quantity }}
                        {{ product.attributes.quantity === 1 ? 'unidad' : 'unidades' }}
                    </template>
                </span>
            </div>
            <div class="owner">
                <span>
                    Quien lo vende:
                    {{ ownerEmail }}
                </span>
            </div>
        </div>
        <div v-else class="product__info">
            <h3>¡Nuevo Producto en Camino!</h3>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import exampleImage from '@/assets/no_imag.jpg'

export default {
    props: ['product'],
    computed: {
        ...mapGetters(['getUserById']),
        ownerEmail() {
            const userId = this.product.relationships.user.data.id;
            const user = this.getUserById(userId);

            return user ? user.attributes.email : 'N/A'
        },
        imageSrc() {
            return exampleImage
        }
    }
}
</script>

<style lang="scss">
    .product {
        background-color: var(--background-card);
        border-radius: 20px;
        box-shadow: 0 0 90px 0 var(--background-card-shadown);
        overflow: hidden;
        cursor: pointer;
        transition: transform 200ms ease-in-out;
        height: 100%;
        &:hover {
            transform: scale(1.05);
            h3 {
                color: var(--text-orange);
            }
        }
        span {
            color: var(--text-gray);
        }
        h3 {
            margin-bottom: 0.5rem;
        }
        &__info {
            padding: 1.5rem;
            .price {
                display: flex;
                align-items: center;
                margin-bottom: 0.5rem;
                span {
                    color: var(--text-gray);
                    &:first-child {
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        margin-right: 0.5rem;
                    }
                }
                .in_stock {
                    background-color: green;
                }
                .no_stock {
                    background-color: red;
                }
            }
            .owner {
                margin-bottom: 0.5rem;
            }
            .stock {
                margin-bottom: 0.5rem;
            }
        }
    }
</style>
