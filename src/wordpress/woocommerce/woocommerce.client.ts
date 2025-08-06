import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class WoocommerceClient implements OnModuleInit {
  private axiosInstance: AxiosInstance;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  onModuleInit() {
    const baseURL = this.configService.get<string>('WOOCOMMERCE_BASE_URL');
    const consumerKey = this.configService.get<string>(
      'WOOCOMMERCE_CONSUMER_KEY',
    );
    const consumerSecret = this.configService.get<string>(
      'WOOCOMMERCE_CONSUMER_SECRET',
    );

    if (!baseURL || !consumerKey || !consumerSecret) {
      throw new Error(
        'WooCommerce API credentials are not configured in .env file',
      );
    }

    this.axiosInstance = axios.create({
      baseURL,
      params: {
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
      },
    });
  }

  async get<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(endpoint, { params });
      return response.data;
    } catch (error) {
      // Aquí se podría añadir un logger más robusto
      if (error instanceof Error) {
        console.error(`Error fetching data from WooCommerce: ${error.message}`);
      }
      throw error;
    }
  }
}
