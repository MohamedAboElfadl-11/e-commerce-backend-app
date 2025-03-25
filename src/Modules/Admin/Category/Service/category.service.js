import CategoryModel from "../../../../Database/Models/category.model.js";

// create category
export const createCategoryService = async (req, res) => {
    const categoryData = req.body;
    const isNameExiste = await CategoryModel.findOne({ name: categoryData.name })
    if (isNameExiste) return res.status(409).json({ message: 'This category name already exist' })
    await CategoryModel.create(categoryData);
    res.status(201).json({ message: 'category created successfully' })
}

// update category
export const updateCategoryService = async (req, res) => {
    const { categoryId } = req.params;
    const categoeyData = req.body;
    const category = await CategoryModel.findById(categoryId)
    if (!category) return res.status(404).json({ message: 'category not found' })
    if (categoeyData.name) {
        const isNameExiste = await CategoryModel.findOne({ name: categoeyData.name })
        if (isNameExiste) return res.status(409).json({ message: 'This category name already exist' })
        category.name = categoeyData.name
    }
    if (categoeyData.description) category.description = categoeyData.description
    if (categoeyData.parentCategory) category.parentCategory = categoeyData.parentCategory
    await category.save()
    res.status(201).json({ message: 'category updated successfully' })
}

// delete category
export const deleteCategoryService = async (req, res) => {
    const { categoryId } = req.params;
    const category = await CategoryModel.findByIdAndDelete(categoryId)
    if (!category) return res.status(404).json({ message: 'category not found' })
    res.status(200).json({ message: 'category deleted successfully' })
}

// search about specific category
export const searchCategoryService = async (req, res) => {
    const { categoryId } = req.params;
    const category = await CategoryModel.findById(categoryId)
    if (!category) return res.status(404).json({ message: 'category not found' })
    res.status(200).json({ category })
}

// get all categories
export const allCategoriesService = async (req, res) => {
    const categories = await CategoryModel.find()
    res.status(200).json({ categories })
}