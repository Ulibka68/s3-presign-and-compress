const state = ref({ post: {} })

function setPost(post) {
    state.value.post = post
}

async function loadPost(id) {
    const post = await fetchPost(id)
    setPost(post)
}

const getPost = computed(() => state.value.post)

export {
    loadPost
    getPost
}


// ****************************
const history = []
history.push(state) // push initial state

watch(state, (newState, oldState) => {
    history.push(newState)
})

/*
TIP: We can achieve the same result without doing initial push using watchEffect function that works like a watch from Options API with immediate flag set to true.
 */

// ****************************

import { reactive, computed } from '@vue/composition-api';

const state = reactive({
    isCartSidebarOpen: false,
    isLoginModalOpen: false
});

const isCartSidebarOpen = computed(() => state.isCartSidebarOpen);
const toggleCartSidebar = () => {
    state.isCartSidebarOpen = !state.isCartSidebarOpen;
};

const isLoginModalOpen = computed(() => state.isLoginModalOpen);
const toggleLoginModal = () => {
    state.isLoginModalOpen = !state.isLoginModalOpen;
};

const uiState = {
    isCartSidebarOpen,
    isLoginModalOpen,
    toggleCartSidebar,
    toggleLoginModal
};

export default uiState;


// Keeping your state local
export default function useProduct() {
    const loading = ref(false)
    const products = ref([])

    async function search (params) {
        loading.value = true
        products.value = await fetchProduct(params)
        loading.value = false
    }
    return {
        loading: computed(() => loading.value)
        products: computed(() => products.value)
        search
    }
}


//****************
const globalState = ref({
    products: {}, // easy to forget if we remove useProduct
    categories: {},
    user: {},
    // ... other state properties
})

// Sharing state between composition functions

export default function useProduct() {
    const loading = ref(false)
    const products = ref([])

    async function search (params) {
        loading.value = true
        products.value = await fetchProduct(params)
        loading.value = false
    }
    return {
        loading: computed(() => loading.value)
        products: computed(() => products.value)
        search
    }
}

const cart = ref({})

function useCart () {
    // super complicated cart logic
    return {
        cart: computed(() => cart.value)
    }
}