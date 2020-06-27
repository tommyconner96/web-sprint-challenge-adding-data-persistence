
exports.up = async function (knex) {
    await knex.schema.createTable("projects", (tbl) => {
        tbl.increments("id")
        tbl.text("project_name")
            .unique()
            .notNullable()
        tbl.text("description")
        tbl.boolean("completed")
            .notNullable()
            .defaultTo(false)
    })

    await knex.schema.createTable("resources", (tbl) => {
        tbl.increments()
        tbl.text("resource_name")
            .unique()
            .notNullable()
        tbl.text("description")
    })

    await knex.schema.createTable("tasks", (tbl) => {
        tbl.increments()
        tbl.integer("project_id")
            .references("id")
            .inTable("projects")
            .unsigned()
            .notNullable()
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
        tbl.text("description")
            .notNullable()
        tbl.text("notes")
        tbl.boolean("completed")
            .defaultTo(false)
            .notNullable()
    })

}

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("tasks")
    await knex.schema.dropTableIfExists("resources")
    await knex.schema.dropTableIfExists("projects")
}
