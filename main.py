from flask import Flask, request, jsonify
from supabase import create_client, Client

app = Flask(__name__)

# Replace these with your Supabase project URL and API key
SUPABASE_URL = ''  # e.g., 'https://xyzcompany.supabase.co'
SUPABASE_KEY = ''  # e.g., 'eyJhbGciOiJI...'

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route('/add_item', methods=['POST'])
def add_item():
    data = request.get_json()
    status = data.get('status')
    sust_level = data.get('sust_level')
    material = data.get('material')

    if status is None or sust_level is None or material is None:
        return jsonify({'error': 'status, sust_level, and material are required fields.'}), 400

    try:
        # Insert the new item into the 'items' table
        response = supabase.table('items').insert({
            'status': status,
            'sust_level': sust_level,
            'material': material
        }).execute()

        return jsonify({
            'message': 'Item added successfully',
            'data': response.data
        }), 200

    except Exception as e:
        # Handle any exceptions that occur during the insert
        return jsonify({'error': str(e)}), 400

@app.route('/change_status', methods=['POST'])
def change_status():
    data = request.get_json()
    item_id = data.get('id')
    new_status = data.get('status')

    if item_id is None or new_status is None:
        return jsonify({'error': 'id and new status are required fields.'}), 400

    try:
        # Update the 'status' of the specified item
        response = supabase.table('items').update({
            'status': new_status
        }).eq('id', item_id).execute()

        return jsonify({
            'message': 'Item status updated successfully',
            'data': response.data
        }), 200

    except Exception as e:
        # Handle any exceptions that occur during the update
        return jsonify({'error': str(e)}), 400

@app.route('/get_total_items_info', methods=['GET'])
def get_total_items_info():
    try:
        # Get all items
        response = supabase.table('items').select('*').execute()
        items = response.data

        total_items = len(items)
        total_sust_level = sum(
            item['sust_level'] for item in items if item.get('sust_level') is not None
        )

        return jsonify({
            'total_items': total_items,
            'total_sust_level': total_sust_level
        }), 200

    except Exception as e:
        # Handle any exceptions that occur during the select
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True, port = 5323)
