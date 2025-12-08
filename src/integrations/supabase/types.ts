export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      loans: {
        Row: {
          application_date: string | null
          approval_date: string | null
          bank_id: string | null
          created_at: string | null
          disbursement_date: string | null
          due_date: string | null
          duration_months: number
          farmer_id: string
          id: string
          interest_rate: number
          loan_amount: number
          notes: string | null
          receipt_id: string | null
          repayment_date: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          application_date?: string | null
          approval_date?: string | null
          bank_id?: string | null
          created_at?: string | null
          disbursement_date?: string | null
          due_date?: string | null
          duration_months: number
          farmer_id: string
          id?: string
          interest_rate: number
          loan_amount: number
          notes?: string | null
          receipt_id?: string | null
          repayment_date?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          application_date?: string | null
          approval_date?: string | null
          bank_id?: string | null
          created_at?: string | null
          disbursement_date?: string | null
          due_date?: string | null
          duration_months?: number
          farmer_id?: string
          id?: string
          interest_rate?: number
          loan_amount?: number
          notes?: string | null
          receipt_id?: string | null
          repayment_date?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loans_bank_id_fkey"
            columns: ["bank_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loans_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loans_receipt_id_fkey"
            columns: ["receipt_id"]
            isOneToOne: false
            referencedRelation: "warehouse_receipts"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_listings: {
        Row: {
          buyer_id: string | null
          commodity: string
          created_at: string | null
          description: string | null
          id: string
          listed_date: string | null
          location: string | null
          price_per_unit: number
          quality_grade: string | null
          quantity: number
          receipt_id: string
          seller_id: string
          sold_date: string | null
          status: string
          total_price: number | null
          unit: string
          updated_at: string | null
        }
        Insert: {
          buyer_id?: string | null
          commodity: string
          created_at?: string | null
          description?: string | null
          id?: string
          listed_date?: string | null
          location?: string | null
          price_per_unit: number
          quality_grade?: string | null
          quantity: number
          receipt_id: string
          seller_id: string
          sold_date?: string | null
          status?: string
          total_price?: number | null
          unit?: string
          updated_at?: string | null
        }
        Update: {
          buyer_id?: string | null
          commodity?: string
          created_at?: string | null
          description?: string | null
          id?: string
          listed_date?: string | null
          location?: string | null
          price_per_unit?: number
          quality_grade?: string | null
          quantity?: number
          receipt_id?: string
          seller_id?: string
          sold_date?: string | null
          status?: string
          total_price?: number | null
          unit?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_listings_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_listings_receipt_id_fkey"
            columns: ["receipt_id"]
            isOneToOne: false
            referencedRelation: "warehouse_receipts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_listings_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          district: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          state: string | null
          updated_at: string | null
          village: string | null
        }
        Insert: {
          created_at?: string | null
          district?: string | null
          email?: string | null
          id: string
          name: string
          phone?: string | null
          state?: string | null
          updated_at?: string | null
          village?: string | null
        }
        Update: {
          created_at?: string | null
          district?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          state?: string | null
          updated_at?: string | null
          village?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      warehouse_receipts: {
        Row: {
          commodity: string
          created_at: string | null
          estimated_value: number
          farmer_id: string
          id: string
          notes: string | null
          quality_grade: string | null
          quantity: number
          receipt_number: string
          status: string
          storage_end_date: string | null
          storage_location: string
          storage_start_date: string
          unit: string
          updated_at: string | null
          warehouse_id: string | null
        }
        Insert: {
          commodity: string
          created_at?: string | null
          estimated_value: number
          farmer_id: string
          id?: string
          notes?: string | null
          quality_grade?: string | null
          quantity: number
          receipt_number: string
          status?: string
          storage_end_date?: string | null
          storage_location: string
          storage_start_date?: string
          unit?: string
          updated_at?: string | null
          warehouse_id?: string | null
        }
        Update: {
          commodity?: string
          created_at?: string | null
          estimated_value?: number
          farmer_id?: string
          id?: string
          notes?: string | null
          quality_grade?: string | null
          quantity?: number
          receipt_number?: string
          status?: string
          storage_end_date?: string | null
          storage_location?: string
          storage_start_date?: string
          unit?: string
          updated_at?: string | null
          warehouse_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "warehouse_receipts_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "warehouse_receipts_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "farmer" | "warehouse" | "bank" | "trader"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["farmer", "warehouse", "bank", "trader"],
    },
  },
} as const
