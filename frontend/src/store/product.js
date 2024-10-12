import { create } from "zustand";

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		try {
			const res = await fetch("/api/products", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newProduct),
			});
			const data = await res.json();
			if (res.ok) {
				set((state) => ({ products: [...state.products, data] }));
				return { success: true, message: "Tutor Entry created successfully" };
			} else {
				return { success: false, message: data.message || "Failed to create Tutor Entry" };
			}
		} catch (error) {
			console.error("Error creating Tutor Entry:", error);
			return { success: false, message: "An error occurred while creating the Tutor Entry" };
		}
	},

	fetchProducts: async () => {
		try {
			const res = await fetch("/api/products");
			if (!res.ok) {
				throw new Error('Failed to fetch Tutor Entries');
			}
			const products = await res.json();
			set({ products });
		} catch (error) {
			console.error("Error fetching Tutor Entries:", error);
			set({ products: [] });
		}
	},

	deleteProduct: async (pid) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
		return { success: true, message: data.message };
	},

	updateProduct: async (pid, updatedProduct) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
		const data = await res.json();
        if (!data.success) return { success: true, message: data.message };
        // why is this so?

		// update the ui immediately, without needing a refresh
		set((state) => ({
			products: state.products.map((product) => (product._id === pid ? data.data : product)),
		}));

		return { success: true, message: data.message };
	},
}));
