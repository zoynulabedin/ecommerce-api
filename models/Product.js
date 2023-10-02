import mongoose from "mongoose";
const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		slug: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
        productType: {
            type: String,
            enum: ["simple", "variable", "grouped", "external"],
            default: "simple",
        },
        ProductSimple: {
            regularPrice: {
                type: Number,
                default: null,
            
            },
            salePrice: {
                type: Number,
                default: null,
            },
            productPhoto: {
                type: [String],
                default: null,
             
            },
            stock: {
                type: Number,
                default: null,
            }
        },
        ProductVariable: [
            {
              size: {
                type: String, 
                default: null,
              },
                color: {
                    type: String,
                    default: null,
                },
                regularPrice: {
                    type: Number,
                    default: null,
                
                },
                salePrice: {
                    type: Number,
                    default: null,
                },
                productPhoto: {
                    type: [String],
                    default: null,
                 
                },
                stock: {
                    type: Number,
                    default: null,
                }

            }
        ],
        ProductGrouped: [
            {
                name: {
                    type: String,
                    default: null,
                
                },
                regularPrice: {
                    type: Number,
                    default: null,
                
                },
                salePrice: {
                    type: Number,
                    default: null,
                },
                productPhoto: {
                    type: [String],
                    default: null,
                 
                },
                stock: {
                    type: Number,
                    default: null,
                }
            }
        ],
        ProductExternal: {
            regularPrice: {
                type: Number,
                default: null,
            
            },
            salePrice: {
                type: Number,
                default: null,
            },
            productPhoto: {
                type: [String],
                default: null,
             
            },
            stock: {
                type: Number,
                default: null,
            },
            externalLink: {
                type: String,
                default: null,
            }
        },
        shortDeescription: {
            type: String,
            default: null,
        },
        longDescription: {
            type: String,
            default: null,
        },
        specifiction: {
            type:String
        },
   
        review: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Review",
            default: null,
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            default: null,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null,
        },
        tag: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Tag",
            default: null,
        },
 
		status: {
			type: Boolean,
			default: true,
		},
		trash: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);
export default mongoose.model("product", productSchema);
