export const masterConfig = {
  camera: {
    label: "Camera",
    tabs: [
      {
        key: "camera_angle",
        label: "Angle",
        field: "camera_angle_name",
        endpoints: {
          list: "/camera-angles",
          create: "/create-camera-angle",
          update: (id) => `/update-camera-angle/${id}`,
          delete: (id) => `/delete-camera-angle/${id}`,
          revert: (id) => `/revert-camera-angle/${id}`,
        },
      },
      {
        key: "camera_shot_type",
        label: "Shot Type",
        field: "camera_shot_type_name",
        endpoints: {
          list: "/camera-shot-types",
          create: "/create-camera-shot-type",
          update: (id) => `/update-camera-shot-type/${id}`,
          delete: (id) => `/delete-camera-shot-type/${id}`,
          revert: (id) => `/revert-camera-shot-type/${id}`,
        },
      },
      {
        key: "camera_movement",
        label: "Movement",
        field: "camera_movement_name",
        endpoints: {
          list: "/camera-movements",
          create: "/create-camera-movement",
          update: (id) => `/update-camera-movement/${id}`,
          delete: (id) => `/delete-camera-movement/${id}`,
          revert: (id) => `/revert-camera-movement/${id}`,
        },
      },
    ],
  },

  lighting: {
    label: "Lighting",
    tabs: [
      {
        key: "lighting_style",
        label: "Style",
        field: "lighting_style_name",
        endpoints: {
          list: "/lighting-styles",
          create: "/create-lighting-style",
          update: (id) => `/update-lighting-style/${id}`,
          delete: (id) => `/delete-lighting-style/${id}`,
          revert: (id) => `/revert-lighting-style/${id}`,
        },
      },
      {
        key: "lighting_light_direction",
        label: "Light Direction",
        field: "lighting_light_direction_name",
        endpoints: {
          list: "/lighting-light-directions",
          create: "/create-lighting-light-direction",
          update: (id) => `/update-lighting-light-direction/${id}`,
          delete: (id) => `/delete-lighting-light-direction/${id}`,
          revert: (id) => `/revert-lighting-light-direction/${id}`,
        },
      },
      {
        key: "lighting_setup",
        label: "Setup",
        field: "lighting_setup_name",
        endpoints: {
          list: "/lighting-setups",
          create: "/create-lighting-setup",
          update: (id) => `/update-lighting-setup/${id}`,
          delete: (id) => `/delete-lighting-setup/${id}`,
          revert: (id) => `/revert-lighting-setup/${id}`,
        },
      },
    ],
  },

  color: {
    label: "Color",
    tabs: [
      {
        key: "color_palette_type",
        label: "Palette Type",
        field: "color_palette_type_name",
        endpoints: {
          list: "/color-palette-types",
          create: "/create-color-palette-type",
          update: (id) => `/update-color-palette-type/${id}`,
          delete: (id) => `/delete-color-palette-type/${id}`,
          revert: (id) => `/revert-color-palette-type/${id}`,
        },
      },
      {
        key: "color_tone",
        label: "Tone",
        field: "color_tone_name",
        endpoints: {
          list: "/color-tones",
          create: "/create-color-tone",
          update: (id) => `/update-color-tone/${id}`,
          delete: (id) => `/delete-color-tone/${id}`,
          revert: (id) => `/revert-color-tone/${id}`,
        },
      },
      {
        key: "color_common_schemes",
        label: "Common Schemes",
        field: "color_common_schemes_name",
        endpoints: {
          list: "/color-common-schemes",
          create: "/create-color-common-scheme",
          update: (id) => `/update-color-common-scheme/${id}`,
          delete: (id) => `/delete-color-common-scheme/${id}`,
          revert: (id) => `/revert-color-common-scheme/${id}`,
        },
      },
    ],
  },

  style: {
    label: "Style",
    tabs: [
      {
        key: "animation_style",
        label: "Animation Style",
        field: "animation_style_name",
        endpoints: {
          list: "/animation-styles",
          create: "/create-animation-style",
          update: (id) => `/update-animation-style/${id}`,
          delete: (id) => `/delete-animation-style/${id}`,
          revert: (id) => `/revert-animation-style/${id}`,
        },
      },
      {
        key: "design_style",
        label: "Design Style",
        field: "design_style_name",
        endpoints: {
          list: "/design-styles",
          create: "/create-design-style",
          update: (id) => `/update-design-style/${id}`,
          delete: (id) => `/delete-design-style/${id}`,
          revert: (id) => `/revert-design-style/${id}`,
        },
      },
      {
        key: "rendering_style",
        label: "Rendering Style",
        field: "rendering_style_name",
        endpoints: {
          list: "/rendering-styles",
          create: "/create-rendering-style",
          update: (id) => `/update-rendering-style/${id}`,
          delete: (id) => `/delete-rendering-style/${id}`,
          revert: (id) => `/revert-rendering-style/${id}`,
        },
      },
    ],
  },

  material: {
    label: "Material",
    tabs: [
      {
        key: "solid_material",
        label: "Solid Material",
        field: "solid_material_style",
        endpoints: {
          list: "/solid-materials",
          create: "/create-solid-material",
          update: (id) => `/update-solid-material/${id}`,
          delete: (id) => `/delete-solid-material/${id}`,
          revert: (id) => `/revert-solid-material/${id}`,
        },
      },
      {
        key: "transparent_special_material",
        label: "Transparent / Special",
        field: "transparent_special_material_name",
        endpoints: {
          list: "/transparent-special-materials",
          create: "/create-transparent-special-material",
          update: (id) => `/update-transparent-special-material/${id}`,
          delete: (id) => `/delete-transparent-special-material/${id}`,
          revert: (id) => `/revert-transparent-special-material/${id}`,
        },
      },
      {
        key: "soft_organic_material",
        label: "Soft / Organic",
        field: "soft_organic_material",
        endpoints: {
          list: "/soft-organic-materials",
          create: "/create-soft-organic-material",
          update: (id) => `/update-soft-organic-material/${id}`,
          delete: (id) => `/delete-soft-organic-material/${id}`,
          revert: (id) => `/revert-soft-organic-material/${id}`,
        },
      },
      {
        key: "surface_finish_material",
        label: "Surface Finish",
        field: "surface_finish_material_name",
        endpoints: {
          list: "/surface-finish-materials",
          create: "/create-surface-finish-material",
          update: (id) => `/update-surface-finish-material/${id}`,
          delete: (id) => `/delete-surface-finish-material/${id}`,
          revert: (id) => `/revert-surface-finish-material/${id}`,
        },
      },
    ],
  },

  environment: {
    label: "Environment",
    tabs: [
      {
        key: "environment_background",
        label: "Background",
        field: "environment_background_name",
        endpoints: {
          list: "/environment-backgrounds",
          create: "/create-environment-background",
          update: (id) => `/update-environment-background/${id}`,
          delete: (id) => `/delete-environment-background/${id}`,
          revert: (id) => `/revert-environment-background/${id}`,
        },
      },
    ],
  },

  composition: {
    label: "Composition",
    tabs: [
      {
        key: "composition",
        label: "Composition",
        field: "composition_name",
        endpoints: {
          list: "/compositions",
          create: "/create-composition",
          update: (id) => `/update-composition/${id}`,
          delete: (id) => `/delete-composition/${id}`,
          revert: (id) => `/revert-composition/${id}`,
        },
      },
    ],
  },

  detail: {
    label: "Detail / Enhancer",
    tabs: [
      {
        key: "detail_enhancer",
        label: "Detail Enhancer",
        field: "detail_enhancer_name",
        endpoints: {
          list: "/detail-enhancers",
          create: "/create-detail-enhancer",
          update: (id) => `/update-detail-enhancer/${id}`,
          delete: (id) => `/delete-detail-enhancer/${id}`,
          revert: (id) => `/revert-detail-enhancer/${id}`,
        },
      },
    ],
  },

  output: {
    label: "Output / Technical",
    tabs: [
      {
        key: "output_technical",
        label: "Output Technical",
        field: "output_technical_name",
        endpoints: {
          list: "/output-technicals",
          create: "/create-output-technical",
          update: (id) => `/update-output-technical/${id}`,
          delete: (id) => `/delete-output-technical/${id}`,
          revert: (id) => `/revert-output-technical/${id}`,
        },
      },
    ],
  },
};
