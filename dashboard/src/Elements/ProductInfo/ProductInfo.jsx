import React, {useState} from 'react';
import FormField from './FormField';
import TagInput from './TagInput';
import ProductGallery from './ProductGallery';
import FormActions from './FormActions';

export default function ProductInfo() {
    const [productName, setProductName] = useState('Lorem Ipsum');
    const [description, setDescription] = useState('Lorem Ipsum Is A Dummy Text');
    const [category, setCategory] = useState('Sneaker');
    const [brandName, setBrandName] = useState('Addidas');
    const [sku, setSku] = useState('#32A53');
    const [stockQuantity, setStockQuantity] = useState('211');
    const [regularPrice, setRegularPrice] = useState('110.40');
    const [salePrice, setSalePrice] = useState('450');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState(['Lorem', 'Lorem']);

    const singleFields = [
        {label: 'Product Name', id: 'productName', value: productName, onChange: e => setProductName(e.target.value)},
        {
            label: 'Description',
            id: 'description',
            type: 'textarea',
            rows: 4,
            value: description,
            onChange: e => setDescription(e.target.value)
        },
        {label: 'Category', id: 'category', value: category, onChange: e => setCategory(e.target.value)},
        {label: 'Brand Name', id: 'brandName', value: brandName, onChange: e => setBrandName(e.target.value)},
    ];

    return (
        <div className="min-h-screen flex flex-col items-center mt-10">
            <div
                className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                <div className="space-y-6">
                    {singleFields.map(field => <FormField key={field.id} {...field} />)}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="SKU" id="sku" value={sku} onChange={e => setSku(e.target.value)}/>
                        <FormField label="Stock Quantity" id="stockQuantity" type="number" value={stockQuantity}
                                   onChange={e => setStockQuantity(e.target.value)}/>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="Regular Price" id="regularPrice" value={regularPrice}
                                   onChange={e => setRegularPrice(e.target.value)} prefix="₹"/>
                        <FormField label="Sale Price" id="salePrice" value={salePrice}
                                   onChange={e => setSalePrice(e.target.value)} prefix="₹"/>
                    </div>
                    <TagInput tags={tags} tagInput={tagInput} onChange={e => setTagInput(e.target.value)}/>
                </div>

                <ProductGallery/>
            </div>

            <FormActions
                ButtonText={'Add Product'}
            />
        </div>
    );
}
