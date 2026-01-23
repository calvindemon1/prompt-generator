// src/config/promptConfig.js

export const promptConfig = {
  resource: "creative-prompt",

  endpoints: {
    create: "/create-creative-prompt",
    list: "/creative-prompts",
    detail: (id) => `/creative-prompts/${id}`,
  },

  fields: {
    name: "creative_prompt_name",
    notes: "prompt_notes",
    prompt: "prompt",
  },

  relations: {
    camera_angle: "camera_angle_ids",
    camera_shot_type: "camera_shot_type_ids",
    camera_movement: "camera_movement_ids",

    lighting_style: "lighting_style_ids",
    lighting_light_direction: "lighting_light_direction_ids",
    lighting_setup: "lighting_setup_ids",

    color_palette_type: "color_palette_type_ids",
    color_tone: "color_tone_ids",
    color_common_schemes: "color_common_schemes_ids",

    animation_style: "animation_style_ids",
    design_style: "design_style_ids",
    rendering_style: "rendering_style_ids",

    solid_material: "solid_material_ids",
    transparent_special_material: "transparent_special_material_ids",
    soft_organic_material: "soft_organic_material_ids",
    surface_finish_material: "surface_finish_material_ids",

    animation_movement_type: "animation_movement_type_ids",
    animation_feel: "animation_feel_ids",
    animation_transition: "animation_transition_ids",

    environment_background: "environment_background_ids",

    composition: "composition_ids",
    detail_enhancer: "detail_enhancer_ids",
    output_technical: "output_technical_ids",
  },
};
