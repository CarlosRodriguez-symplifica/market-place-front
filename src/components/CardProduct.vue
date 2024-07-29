<template>
  <div class="product">
    <img class="product_img" :src="imageSrc" :alt="product.attributes.title">
    <div class="product__info">
        <h3>{{ product.attributes.title }}</h3>
        <div class="price">
            <span
                :class="
                    product.attributes.published === true ? 'published' :
                    product.attributes.published === false ? 'not_published' :
                    'default'
                "
            ></span>
            <span>{{ product.attributes.price }}</span>
        </div>
        <div class="owner">
            <span>
                Quien lo vende:
                {{ ownerEmail }}
            </span>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import exampleImage from '@/assets/not_found.jpg'

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
                .published {
                    background-color: green;
                }
                .not_published {
                    background-color: red;
                }
                .default {
                    background-color: white;
                }
            }
            .owner {
                margin-bottom: 0.5rem;
            }
        }
    }
</style>
