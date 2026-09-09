
import { useRef, useState } from "react";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth.jsx";
import useAdminData from "../../hooks/useAdminData.jsx";

import {
  Users,
  PackagePlus,
  ShieldCheck,
  Mail,
  Lock,
  User,
  Tag,
  DollarSign,
  Percent,
  Star,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Upload,
  CheckCircle2,
  Sparkles,
  X,
} from "lucide-react";

/* =========================================================
   DEFAULT FORM VALUES
========================================================= */

const DEFAULT_USER_FORM = {
  username: "",
  email: "",
  password: "",
  role: "user",
};

const DEFAULT_PRODUCT_FORM = {
  title: "",
  category: "Casual",
  dressCode: "Shirts",
  gender: "men",
  style: "",
  image: null,
  images: [],
  description: "",
  price: "",
  originalPrice: "",
  discount: "",
  colors: "#000000",
  rating: 4.5,
  isTopSelling: false,
};

/* =========================================================
   REUSABLE INPUT
========================================================= */

function InputField({
  icon: Icon,
  rightIcon: RightIcon,
  onRightIconClick,
  className = "",
  ...props
}) {
  return (
    <div className="relative">
      {Icon && (
        <Icon
          size={17}
          strokeWidth={1.8}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
      )}

      <input
        {...props}
        className={`
          h-12 w-full rounded-xl border border-gray-200
          bg-gray-50
          ${Icon ? "pl-11" : "pl-4"}
          ${RightIcon ? "pr-11" : "pr-4"}
          text-sm font-medium text-black
          outline-none
          transition-all duration-200
          placeholder:text-gray-400
          hover:border-gray-300
          hover:bg-white
          focus:border-black
          focus:bg-white
          focus:ring-4
          focus:ring-black/5
          disabled:cursor-not-allowed
          disabled:opacity-60
          ${className}
        `}
      />

      {RightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-black"
        >
          <RightIcon size={17} />
        </button>
      )}
    </div>
  );
}

/* =========================================================
   REUSABLE SELECT
========================================================= */

function SelectField({ options, ...props }) {
  return (
    <select
      {...props}
      className="
        h-12 w-full cursor-pointer rounded-xl
        border border-gray-200
        bg-gray-50
        px-4
        text-sm font-medium text-black
        outline-none
        transition-all duration-200
        hover:border-gray-300
        hover:bg-white
        focus:border-black
        focus:bg-white
        focus:ring-4
        focus:ring-black/5
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

/* =========================================================
   FIELD WRAPPER
========================================================= */

function Field({ label, hint, required = false, children }) {
  return (
    <div className="space-y-2">
      <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-gray-700">
        {label}

        {required && (
          <span className="ml-1 text-gray-400">*</span>
        )}
      </label>

      {children}

      {hint && (
        <p className="text-[10px] leading-4 text-gray-400">
          {hint}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({ number, title, subtitle }) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black text-xs font-bold text-white">
        {number}
      </div>

      <div>
        <h3 className="text-sm font-bold text-black">
          {title}
        </h3>

        <p className="mt-1 text-[11px] leading-4 text-gray-400">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   CARD HEADER
========================================================= */

function CardHeader({
  icon: Icon,
  title,
  subtitle,
  tag,
}) {
  return (
    <div className="relative overflow-hidden bg-black px-6 py-6 text-white sm:px-8">
      {/* Decorative circles */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute -bottom-16 left-1/3 h-32 w-32 rounded-full bg-white/5 blur-3xl" />

      <div className="relative flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-black shadow-lg">
            <Icon size={20} strokeWidth={2} />
          </div>

          <div>
            <h2 className="text-base font-bold tracking-tight sm:text-lg">
              {title}
            </h2>

            <p className="mt-1 text-[11px] text-gray-400">
              {subtitle}
            </p>
          </div>
        </div>

        <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400 sm:block">
          {tag}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   FILE UPLOAD BOX
========================================================= */

function FileUpload({
  name,
  multiple = false,
  accept = "image/*",
  onChange,
  required = false,
}) {
  return (
    <label
      className="
        group flex min-h-[100px]
        cursor-pointer flex-col
        items-center justify-center
        rounded-xl border
        border-dashed border-gray-300
        bg-gray-50
        px-4 py-5
        text-center
        transition-all duration-200
        hover:border-black
        hover:bg-white
      "
    >
      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white transition-transform duration-200 group-hover:scale-105">
        <Upload size={16} />
      </div>

      <p className="text-xs font-bold text-black">
        {multiple
          ? "Choose additional images"
          : "Choose main image"}
      </p>

      <p className="mt-1 text-[10px] text-gray-400">
        PNG, JPG, WEBP
      </p>

      <input
        type="file"
        name={name}
        multiple={multiple}
        accept={accept}
        required={required}
        onChange={onChange}
        className="hidden"
      />
    </label>
  );
}

/* =========================================================
   LOADING SPINNER
========================================================= */

function Spinner() {
  return (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

const AdminManage = () => {
  /* =======================================================
     HOOKS
  ======================================================= */

  const { handleAddUser } = useAuth();
  const { handleAddProduct } = useAdminData();

  /* =======================================================
     USER STATE
  ======================================================= */

  const [userForm, setUserForm] = useState(DEFAULT_USER_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  /* =======================================================
     PRODUCT STATE
  ======================================================= */

  const [productForm, setProductForm] = useState(
    DEFAULT_PRODUCT_FORM
  );

  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const [mainImagePreview, setMainImagePreview] = useState("");
  const [additionalImagePreviews, setAdditionalImagePreviews] =
    useState([]);

  const mainImageInputRef = useRef(null);
  const additionalImagesInputRef = useRef(null);

  /* =======================================================
     USER FORM HANDLER
  ======================================================= */

  const handleUserChange = (event) => {
    const { name, value } = event.target;

    setUserForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  /* =======================================================
     USER FORM SUBMIT
  ======================================================= */

  const handleUserSubmit = async (event) => {
    event.preventDefault();

    const username = userForm.username.trim();
    const email = userForm.email.trim();
    const password = userForm.password.trim();

    if (!username || !email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      setIsCreatingUser(true);

      await handleAddUser(
        username,
        email,
        password,
        userForm.role
      );

      toast.success("User created successfully!");

      setUserForm(DEFAULT_USER_FORM);
    } catch (error) {
      console.error("Create user error:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create user.";

      toast.error(message);
    } finally {
      setIsCreatingUser(false);
    }
  };

  /* =======================================================
     PRODUCT FORM HANDLER
  ======================================================= */

  const handleProductChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
      files,
    } = event.target;

    /* File input */
    if (type === "file") {
      if (!files) return;

      /* Main image */
      if (name === "image") {
        const file = files[0];

        if (!file) return;

        setProductForm((previousForm) => ({
          ...previousForm,
          image: file,
        }));

        setMainImagePreview(
          URL.createObjectURL(file)
        );

        return;
      }

      /* Additional images */
      if (name === "images") {
        const selectedFiles = Array.from(files);

        setProductForm((previousForm) => ({
          ...previousForm,
          images: selectedFiles,
        }));

        const previews = selectedFiles.map((file) =>
          URL.createObjectURL(file)
        );

        setAdditionalImagePreviews(previews);

        return;
      }
    }

    /* Checkbox */
    if (type === "checkbox") {
      setProductForm((previousForm) => ({
        ...previousForm,
        [name]: checked,
      }));

      return;
    }

    /* Normal input */
    setProductForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  /* =======================================================
     REMOVE MAIN IMAGE
  ======================================================= */

  const removeMainImage = () => {
    setProductForm((previousForm) => ({
      ...previousForm,
      image: null,
    }));

    setMainImagePreview("");

    if (mainImageInputRef.current) {
      mainImageInputRef.current.value = "";
    }
  };

  /* =======================================================
     REMOVE ADDITIONAL IMAGES
  ======================================================= */

  const removeAdditionalImages = () => {
    setProductForm((previousForm) => ({
      ...previousForm,
      images: [],
    }));

    setAdditionalImagePreviews([]);

    if (additionalImagesInputRef.current) {
      additionalImagesInputRef.current.value = "";
    }
  };

  /* =======================================================
     PRODUCT VALIDATION
  ======================================================= */

  const validateProduct = () => {
    if (!productForm.title.trim()) {
      toast.error("Please enter a product title.");
      return false;
    }

    if (!productForm.price) {
      toast.error("Please enter the product price.");
      return false;
    }

    if (Number(productForm.price) < 0) {
      toast.error("Price cannot be negative.");
      return false;
    }

    if (
      productForm.originalPrice &&
      Number(productForm.originalPrice) < 0
    ) {
      toast.error("Original price cannot be negative.");
      return false;
    }

    if (
      productForm.discount &&
      (Number(productForm.discount) < 0 ||
        Number(productForm.discount) > 100)
    ) {
      toast.error("Discount must be between 0 and 100.");
      return false;
    }

    if (
      Number(productForm.rating) < 0 ||
      Number(productForm.rating) > 5
    ) {
      toast.error("Rating must be between 0 and 5.");
      return false;
    }

    if (!productForm.image) {
      toast.error("Please select a main product image.");
      return false;
    }

    return true;
  };

  /* =======================================================
     PRODUCT SUBMIT
  ======================================================= */

  const handleProductSubmit = async (event) => {
    event.preventDefault();

    if (!validateProduct()) {
      return;
    }

    const formData = new FormData();

    /* Add normal product fields */
    formData.append("title", productForm.title.trim());
    formData.append("category", productForm.category);
    formData.append("dressCode", productForm.dressCode);
    formData.append("gender", productForm.gender);
    formData.append("style", productForm.style.trim());
    formData.append(
      "description",
      productForm.description.trim()
    );
    formData.append("price", productForm.price);
    formData.append(
      "originalPrice",
      productForm.originalPrice
    );
    formData.append("discount", productForm.discount);
    formData.append("colors", productForm.colors);
    formData.append("rating", productForm.rating);
    formData.append(
      "isTopSelling",
      productForm.isTopSelling
    );

    /* Add main image */
    if (productForm.image) {
      formData.append("image", productForm.image);
    }

    /* Add additional images */
    productForm.images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      setIsAddingProduct(true);

      await handleAddProduct(formData);

      toast.success("Product added successfully!");

      /* Reset form */
      setProductForm(DEFAULT_PRODUCT_FORM);

      setMainImagePreview("");
      setAdditionalImagePreviews([]);

      if (mainImageInputRef.current) {
        mainImageInputRef.current.value = "";
      }

      if (additionalImagesInputRef.current) {
        additionalImagesInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Add product error:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to add product.";

      toast.error(message);
    } finally {
      setIsAddingProduct(false);
    }
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="min-h-screen w-full bg-[#f5f5f5] text-black">
      <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header className="relative mb-8 overflow-hidden rounded-3xl bg-black text-white shadow-xl">
          {/* Background decoration */}
          <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full border border-white/5 bg-white/[0.03]" />

          <div className="absolute bottom-[-100px] left-[35%] h-64 w-64 rounded-full border border-white/5 bg-white/[0.03]" />

          <div className="relative px-6 py-7 sm:px-8 sm:py-9 lg:px-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              {/* Header text */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white text-black shadow-lg">
                  <ShieldCheck
                    size={23}
                    strokeWidth={2}
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />

                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                      Administration
                    </p>
                  </div>

                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Admin Management
                  </h1>

                  <p className="mt-2 max-w-xl text-xs leading-5 text-gray-400 sm:text-sm">
                    Manage users and create products from one
                    simple control panel.
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <CheckCircle2
                  size={14}
                  className="text-white"
                />

                <span className="text-[10px] font-semibold text-gray-300">
                  System Ready
                </span>
              </div>
            </div>

            {/* Header bottom */}
            <div className="mt-7 flex flex-wrap gap-3 border-t border-white/10 pt-5">
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <Users size={13} />

                <span className="text-[10px] font-semibold text-gray-300">
                  User Management
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <PackagePlus size={13} />

                <span className="text-[10px] font-semibold text-gray-300">
                  Product Management
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-8">
          {/* =================================================
              CREATE USER
          ================================================= */}

          <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <CardHeader
              icon={Users}
              title="Create New User"
              subtitle="Add a new account to your system."
              tag="USER"
            />

            <form
              onSubmit={handleUserSubmit}
              className="p-5 sm:p-8"
            >
              <div className="mb-7 rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white">
                    <Sparkles size={15} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-black">
                      Account Details
                    </p>

                    <p className="mt-0.5 text-[10px] text-gray-400">
                      Enter the basic information for the new
                      account.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Username */}
                <Field
                  label="Username"
                  required
                >
                  <InputField
                    icon={User}
                    type="text"
                    name="username"
                    value={userForm.username}
                    onChange={handleUserChange}
                    placeholder="Enter username"
                    autoComplete="username"
                    disabled={isCreatingUser}
                    required
                  />
                </Field>

                {/* Email */}
                <Field
                  label="Email Address"
                  required
                >
                  <InputField
                    icon={Mail}
                    type="email"
                    name="email"
                    value={userForm.email}
                    onChange={handleUserChange}
                    placeholder="Enter email address"
                    autoComplete="email"
                    disabled={isCreatingUser}
                    required
                  />
                </Field>

                {/* Password */}
                <Field
                  label="Password"
                  required
                  hint="Use at least 6 characters."
                >
                  <InputField
                    icon={Lock}
                    rightIcon={
                      showPassword ? EyeOff : Eye
                    }
                    onRightIconClick={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
                    }
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={userForm.password}
                    onChange={handleUserChange}
                    placeholder="Enter password"
                    autoComplete="new-password"
                    disabled={isCreatingUser}
                    required
                  />
                </Field>

                {/* Role */}
                <Field label="User Role">
                  <SelectField
                    name="role"
                    value={userForm.role}
                    onChange={handleUserChange}
                    disabled={isCreatingUser}
                    options={[
                      {
                        value: "user",
                        label: "User",
                      },
                      {
                        value: "admin",
                        label: "Admin",
                      },
                    ]}
                  />
                </Field>
              </div>

              {/* User submit */}
              <div className="mt-8 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold text-black">
                    Ready to create?
                  </p>

                  <p className="mt-1 text-[10px] text-gray-400">
                    Check the details before creating the
                    account.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isCreatingUser}
                  className="
                    inline-flex h-12
                    items-center justify-center
                    gap-2 rounded-xl
                    bg-black px-6
                    text-xs font-bold text-white
                    shadow-lg shadow-black/10
                    transition-all duration-200
                    hover:bg-gray-800
                    hover:shadow-xl
                    active:scale-[0.98]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {isCreatingUser ? (
                    <>
                      <Spinner />
                      Creating User...
                    </>
                  ) : (
                    <>
                      <Users size={16} />
                      Create User
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>

          {/* =================================================
              ADD PRODUCT
          ================================================= */}

          <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <CardHeader
              icon={PackagePlus}
              title="Add New Product"
              subtitle="Create a complete product listing."
              tag="PRODUCT"
            />

            <form
              onSubmit={handleProductSubmit}
              className="p-5 sm:p-8"
            >
              {/* =================================================
                  BASIC INFORMATION
              ================================================= */}

              <section>
                <SectionTitle
                  number="01"
                  title="Basic Information"
                  subtitle="Enter the main information about your product."
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Product title */}
                  <Field
                    label="Product Title"
                    required
                  >
                    <InputField
                      icon={Tag}
                      type="text"
                      name="title"
                      value={productForm.title}
                      onChange={handleProductChange}
                      placeholder="e.g. Graphic T-Shirt"
                      disabled={isAddingProduct}
                      required
                    />
                  </Field>

                  {/* Category */}
                  <Field
                    label="Category"
                    required
                  >
                    <SelectField
                      name="category"
                      value={productForm.category}
                      onChange={handleProductChange}
                      disabled={isAddingProduct}
                      options={[
                        {
                          value: "Casual",
                          label: "Casual",
                        },
                        {
                          value: "Formal",
                          label: "Formal",
                        },
                        {
                          value: "Party",
                          label: "Party",
                        },
                        {
                          value: "Gym",
                          label: "Gym",
                        },
                      ]}
                    />
                  </Field>

                  {/* Dress Code */}
                  <Field
                    label="Dress Code"
                    required
                  >
                    <SelectField
                      name="dressCode"
                      value={productForm.dressCode}
                      onChange={handleProductChange}
                      disabled={isAddingProduct}
                      options={[
                        {
                          value: "Shirts",
                          label: "Shirts",
                        },
                        {
                          value: "T Shirts",
                          label: "T Shirts",
                        },
                        {
                          value: "Pants",
                          label: "Pants",
                        },
                        {
                          value: "Trouser",
                          label: "Trouser",
                        },
                        {
                          value: "Boots",
                          label: "Boots",
                        },
                        {
                          value: "Streetwears",
                          label: "Streetwears",
                        },
                      ]}
                    />
                  </Field>

                  {/* Gender */}
                  <Field
                    label="Gender"
                    required
                  >
                    <SelectField
                      name="gender"
                      value={productForm.gender}
                      onChange={handleProductChange}
                      disabled={isAddingProduct}
                      options={[
                        {
                          value: "men",
                          label: "Men",
                        },
                        {
                          value: "women",
                          label: "Women",
                        },
                        {
                          value: "both",
                          label: "Both",
                        },
                        {
                          value: "none of these",
                          label: "None of these",
                        },
                      ]}
                    />
                  </Field>

                  {/* Style */}
                  <div className="sm:col-span-2">
                    <Field
                      label="Style"
                      hint="Example: Modern, Minimalist, Oversized, Vintage."
                    >
                      <InputField
                        type="text"
                        name="style"
                        value={productForm.style}
                        onChange={handleProductChange}
                        placeholder="e.g. Modern Minimalist"
                        disabled={isAddingProduct}
                      />
                    </Field>
                  </div>
                </div>
              </section>

              <div className="my-9 h-px bg-gray-200" />

              {/* =================================================
                  PRODUCT IMAGES
              ================================================= */}

              <section>
                <SectionTitle
                  number="02"
                  title="Product Images"
                  subtitle="Upload the main image and optional additional images."
                />

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {/* Main image */}
                  <Field
                    label="Main Image"
                    required
                  >
                    {!mainImagePreview ? (
                      <FileUpload
                        name="image"
                        required
                        onChange={handleProductChange}
                      />
                    ) : (
                      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                        <img
                          src={mainImagePreview}
                          alt="Product preview"
                          className="h-52 w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={removeMainImage}
                          disabled={isAddingProduct}
                          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white shadow-lg transition hover:bg-gray-800"
                        >
                          <X size={15} />
                        </button>

                        <div className="absolute bottom-3 left-3 rounded-lg bg-black/80 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur">
                          Main Image
                        </div>
                      </div>
                    )}
                  </Field>

                  {/* Additional images */}
                  <Field
                    label="Additional Images"
                    hint="You can select multiple images at once."
                  >
                    {additionalImagePreviews.length === 0 ? (
                      <FileUpload
                        name="images"
                        multiple
                        onChange={handleProductChange}
                      />
                    ) : (
                      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3">
                        <div className="grid grid-cols-3 gap-2">
                          {additionalImagePreviews.map(
                            (preview, index) => (
                              <img
                                key={`${preview}-${index}`}
                                src={preview}
                                alt={`Product ${index + 1}`}
                                className="h-24 w-full rounded-lg object-cover"
                              />
                            )
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={
                            removeAdditionalImages
                          }
                          disabled={isAddingProduct}
                          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2 text-[10px] font-bold text-gray-600 transition hover:border-black hover:text-black"
                        >
                          <X size={13} />
                          Remove Images
                        </button>
                      </div>
                    )}
                  </Field>

                  {/* Description */}
                  <div className="lg:col-span-2">
                    <Field
                      label="Description"
                      hint="Write a clear and useful description for customers."
                    >
                      <textarea
                        name="description"
                        rows={5}
                        value={productForm.description}
                        onChange={handleProductChange}
                        disabled={isAddingProduct}
                        placeholder="Write a detailed product description..."
                        className="
                          w-full resize-none rounded-xl
                          border border-gray-200
                          bg-gray-50 p-4
                          text-sm font-medium text-black
                          outline-none
                          transition-all duration-200
                          placeholder:text-gray-400
                          hover:border-gray-300
                          hover:bg-white
                          focus:border-black
                          focus:bg-white
                          focus:ring-4
                          focus:ring-black/5
                          disabled:cursor-not-allowed
                          disabled:opacity-60
                        "
                      />
                    </Field>
                  </div>
                </div>
              </section>

              <div className="my-9 h-px bg-gray-200" />

              {/* =================================================
                  PRICING
              ================================================= */}

              <section>
                <SectionTitle
                  number="03"
                  title="Pricing & Rating"
                  subtitle="Set the price, discount and customer rating."
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Price */}
                  <Field
                    label="Price ($)"
                    required
                  >
                    <InputField
                      icon={DollarSign}
                      type="number"
                      name="price"
                      value={productForm.price}
                      onChange={handleProductChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      disabled={isAddingProduct}
                      required
                    />
                  </Field>

                  {/* Original price */}
                  <Field label="Original Price">
                    <InputField
                      icon={DollarSign}
                      type="number"
                      name="originalPrice"
                      value={productForm.originalPrice}
                      onChange={handleProductChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      disabled={isAddingProduct}
                    />
                  </Field>

                  {/* Discount */}
                  <Field
                    label="Discount (%)"
                    hint="0 - 100"
                  >
                    <InputField
                      icon={Percent}
                      type="number"
                      name="discount"
                      value={productForm.discount}
                      onChange={handleProductChange}
                      placeholder="0"
                      min="0"
                      max="100"
                      disabled={isAddingProduct}
                    />
                  </Field>

                  {/* Rating */}
                  <Field
                    label="Rating"
                    hint="0 - 5"
                  >
                    <InputField
                      icon={Star}
                      type="number"
                      name="rating"
                      value={productForm.rating}
                      onChange={handleProductChange}
                      min="0"
                      max="5"
                      step="0.1"
                      disabled={isAddingProduct}
                    />
                  </Field>
                </div>
              </section>

              <div className="my-9 h-px bg-gray-200" />

              {/* =================================================
                  PRODUCT OPTIONS
              ================================================= */}

              <section>
                <SectionTitle
                  number="04"
                  title="Product Options"
                  subtitle="Configure the product color and visibility."
                />

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {/* Color */}
                  <Field
                    label="Product Color"
                    hint={`Selected color: ${productForm.colors}`}
                  >
                    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-3">
                      <input
                        type="color"
                        name="colors"
                        value={productForm.colors}
                        onChange={handleProductChange}
                        disabled={isAddingProduct}
                        className="h-12 w-16 cursor-pointer rounded-lg border border-gray-200 bg-white p-1"
                      />

                      <div>
                        <p className="text-xs font-bold text-black">
                          Product Color
                        </p>

                        <p className="mt-1 font-mono text-[11px] uppercase text-gray-400">
                          {productForm.colors}
                        </p>
                      </div>
                    </div>
                  </Field>

                  {/* Top selling */}
                  <label
                    htmlFor="isTopSelling"
                    className="
                      flex cursor-pointer
                      items-center justify-between
                      gap-4 rounded-xl
                      border border-gray-200
                      bg-gray-50 p-4
                      transition-all duration-200
                      hover:border-black
                      hover:bg-white
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                        <Star size={16} />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-black">
                          Top Selling Product
                        </p>

                        <p className="mt-1 text-[10px] text-gray-400">
                          Mark this product as a popular item.
                        </p>
                      </div>
                    </div>

                    {/* Custom switch */}
                    <div className="relative shrink-0">
                      <input
                        id="isTopSelling"
                        type="checkbox"
                        name="isTopSelling"
                        checked={
                          productForm.isTopSelling
                        }
                        onChange={handleProductChange}
                        disabled={isAddingProduct}
                        className="peer sr-only"
                      />

                      <div
                        className="
                          h-6 w-11 rounded-full
                          bg-gray-300
                          transition-colors
                          peer-checked:bg-black
                          peer-disabled:opacity-50
                        "
                      />

                      <div
                        className="
                          absolute left-1 top-1
                          h-4 w-4 rounded-full
                          bg-white shadow-sm
                          transition-transform
                          peer-checked:translate-x-5
                        "
                      />
                    </div>
                  </label>
                </div>
              </section>

              {/* =================================================
                  PRODUCT SUBMIT
              ================================================= */}

              <div className="mt-9 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold text-black">
                    Product Listing
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-gray-400">
                    Review all information before adding the
                    product.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isAddingProduct}
                  className="
                    inline-flex h-12
                    items-center justify-center
                    gap-2 rounded-xl
                    bg-black px-7
                    text-xs font-bold text-white
                    shadow-lg shadow-black/10
                    transition-all duration-200
                    hover:bg-gray-800
                    hover:shadow-xl
                    active:scale-[0.98]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {isAddingProduct ? (
                    <>
                      <Spinner />
                      Adding Product...
                    </>
                  ) : (
                    <>
                      <PackagePlus size={16} />
                      Add Product
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer className="flex flex-col gap-3 border-t border-gray-200 px-1 pb-6 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-500">
                Admin Control Panel
              </p>

              <p className="mt-1 text-[10px] text-gray-400">
                Manage your store from one place.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-black" />

              <span className="text-[10px] font-semibold text-gray-400">
                System Ready
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminManage;
